import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

/**
 * Configures and registers OpenAPI specification generation, Swagger UI documentation, and Zod type compilers.
 *
 * This plugin helper exists to provide automated API documentation and strict runtime request/response validation.
 * Specifically, it:
 * 1. Attaches Zod schema validator and serializer compilers (`validatorCompiler`, `serializerCompiler`) to Fastify,
 *    enabling type-safe request parsing and response transformation with `fastify-type-provider-zod`.
 * 2. Registers `@fastify/swagger` to automatically generate OpenAPI 3.0 specifications derived directly from
 *    Zod route schemas, keeping API documentation synchronized with application logic without manual schema duplication.
 * 3. Mounts `@fastify/swagger-ui` under `/docs`, serving an interactive web interface for developers to explore,
 *    inspect, and test API endpoints.
 *
 * @param app - Fastify instance on which the Swagger plugins and compilers are registered.
 */
export async function registerSwagger(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(swagger, {
    openapi: {
      info: {
        title: "Project Camp API",
        description: "Project Camp Fastify Backend API Service",
        version: "1.0.0",
      },
      servers: [
        {
          url: "/",
          description: "Default server",
        },
      ],
      tags: [
        { name: "Health", description: "Health check and status endpoints" },
        {
          name: "Projects",
          description: "Project management and proposal endpoints",
        },
      ],
    },
    transform: jsonSchemaTransform,
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });
}
