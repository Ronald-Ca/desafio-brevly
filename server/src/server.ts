import fastifyCors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import { validatorCompiler, serializerCompiler, jsonSchemaTransform, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { routes } from "./routes";
import { env } from "./env";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Fastify API',
            version: '1.0.0'
        }
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(routes)

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server is running on port ${env.PORT}`);
})