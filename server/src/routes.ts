import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "./infra/db";
import { links } from "./infra/db/schemas/links";
import { desc, eq } from "drizzle-orm";
import { uuidv7 } from "uuidv7";
import { Readable } from "node:stream";
import { uploadFileToStorage } from "./functions/upload-csv";

export const routes: FastifyPluginAsyncZod = async (app) => {
    app.post(
        "/link",
        {
            schema: {
                tags: ["links"],
                description: "Create a new link",
                body: z.object({
                    link: z.string().url(),
                    shortLink: z.string().regex(/^[A-Za-z0-9_-]+$/, "Formato inválido para link encurtado"),
                }),
                response: {
                    201: z.null(),
                    409: z.object({ message: z.string() }),
                },
            },
        },
        async (request, reply) => {
            const { link, shortLink } = request.body;

            const exists = await db
                .select()
                .from(links)
                .where(eq(links.shortLink, shortLink))
                .then(res => res[0]);

            if (exists) {
                return reply.status(409).send({ message: "Link encurtado já existe" });
            }

            await db.insert(links).values({
                id: uuidv7(),
                link,
                shortLink,
            });

            return reply.status(201).send(null);
        }
    );

    app.get(
        "/link",
        {
            schema: {
                tags: ["links"],
                description: "Get all links",
                operationId: "getLinks",
                response: {
                    200: z.array(
                        z.object({
                            id: z.string().uuid(),
                            link: z.string().url(),
                            shortLink: z.string(),
                            visits: z.number().int(),
                        })
                    ),
                },
            },
        },
        async (_, reply) => {
            const allLinks = await db
                .select()
                .from(links)
                .orderBy(desc(links.createdAt));
            return reply.status(200).send(allLinks);
        }
    );

    app.delete(
        "/link/:id",
        {
            schema: {
                tags: ["links"],
                description: "Delete a link",
                operationId: "deleteLink",
                params: z.object({
                    id: z.string().uuid(),
                }),
                response: {
                    204: z.null(),
                    404: z.object({ message: z.string() }),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const deleted = await db.delete(links).where(eq(links.id, id)).returning();

            if (deleted.length === 0) {
                return reply.status(404).send({ message: "Link not found" });
            }

            return reply.status(204).send();
        }
    );

    app.get(
        "/:shortLink",
        {
            schema: {
                tags: ["links"],
                description: "Redirect to the original link",
                operationId: "redirectLink",
                params: z.object({
                    shortLink: z.string().regex(/^[A-Za-z0-9_-]+$/, "Formato inválido para link encurtado"),
                }),
                response: {
                    200: z.object({ link: z.string().url() }),
                    404: z.object({ message: z.string() }),
                },
            },
        },
        async (req, reply) => {
            const rec = await db
                .select()
                .from(links)
                .where(eq(links.shortLink, req.params.shortLink))
                .then(res => res[0]);

            if (!rec) {
                return reply.status(404).send({ message: "Link não encontrado" });
            }

            await db
                .update(links)
                .set({ visits: rec.visits + 1 })
                .where(eq(links.id, rec.id));

            return reply.send({ link: rec.link });
        }
    );

    app.get(
        "/link/download-csv",
        {
            schema: {
                tags: ["links"],
                description: "Download all links in CSV format",
                operationId: "downloadLinks",
                response: {
                    200: z.object({ url: z.string().url() }),
                },
            },
        },
        async (_, reply) => {
            console.log("Downloading links as CSV");
            const allLinks = await db.select().from(links);

            const header = ["URL Original", "URL Encurtada", "Acessos", "Criado em"];
            const rows = allLinks.map((link) => [
                link.link,
                link.shortLink,
                link.visits.toString(),
                link.createdAt?.toISOString() ?? "",
            ]);

            const csvString =
                [header, ...rows]
                    .map((row) =>
                        row.map((val) => `"${val.replace(/"/g, '""')}"`).join(",")
                    )
                    .join("\n") + "\n";

            const stream = Readable.from(csvString);

            const { url } = await uploadFileToStorage({
                folder: "downloads",
                fileName: "links.csv",
                contentType: "text/csv",
                contentStream: stream,
            });

            return reply.status(200).send({ url });
        }
    );
};
