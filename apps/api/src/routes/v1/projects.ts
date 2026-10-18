import { projectSchema } from "@repo/common";
import { db } from "@repo/db";
import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

const listProjectsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

const notFoundResponseSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});

/**
 * Route plugin exposing endpoints to query projects from the database.
 *
 * Demonstrates consuming database tables and relations defined in `@repo/db`
 * alongside runtime validation schemas defined in `@repo/common`.
 *
 * @param app - Fastify instance on which project routes are mounted.
 */
export const v1ProjectRoutes: FastifyPluginAsync = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/projects",
    {
      schema: {
        description: "Retrieve a list of projects from the database",
        tags: ["Projects"],
        querystring: listProjectsQuerySchema,
        response: {
          200: z.array(projectSchema),
        },
      },
    },
    async (request) => {
      const { limit, offset } = request.query;

      const results = await db.query.projects.findMany({
        limit,
        offset,
      });

      return results;
    },
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/projects/:id",
    {
      schema: {
        description: "Retrieve a single project by its unique identifier",
        tags: ["Projects"],
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: projectSchema,
          404: notFoundResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const project = await db.query.projects.findFirst({
        where: { id },
      });

      if (!project) {
        return reply.notFound("Project not found");
      }

      return project;
    },
  );
};
