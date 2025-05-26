import { randomUUID } from "node:crypto";
import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaService } from "../prisma/prisma-service";

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

            const exists = await PrismaService.link.findUnique({ where: { shortLink } })

            if (exists) reply.status(409).send({ message: "Link encurtado já existe" });

            await PrismaService.link.create({
                data: {
                    id: randomUUID(),
                    link,
                    shortLink,
                },
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
            const allLinks = await PrismaService.link.findMany();
            return reply.status(200).send(allLinks);
        }
    )

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
                    404: z.object({ message: z.string() })
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            try {
                await PrismaService.link.delete({ where: { id } });
                return reply.status(204).send();
            } catch {
                return reply.status(404).send({ message: "Link not found" });
            }
        }
    );

    app.get("/:shortLink",
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
            const rec = await PrismaService.link.findUnique({
                where: { shortLink: req.params.shortLink },
            });
            console.log('eu')

            if (!rec) {
                return reply.status(404).send({ message: "Link não encontrado" });
            }

            await PrismaService.link.update({
                where: { id: rec.id },
                data: { visits: { increment: 1 } },
            });

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
                response: { 200: z.string() },
            },
        },
        async (_, reply) => {
            const allLinks = await PrismaService.link.findMany();

            const header = ["id", "link", "shortLink"];
            const rows = allLinks.map((l: { id: string; link: string; shortLink: string }): string =>
                [l.id, l.link, l.shortLink].map((v) => `"${v.replace(/"/g, '""')}"`).join(",")
            );
            const csv = [header.join(","), ...rows].join("\n");

            reply.header("Content-Type", "text/csv; charset=utf-8");
            return csv;
        }
    );
};
