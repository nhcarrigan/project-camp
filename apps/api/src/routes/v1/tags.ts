import { tagsQuerySchema, tagsResponseSchema } from "@repo/common";
import {
  and,
  asc,
  db,
  desc,
  eq,
  ilike,
  or,
  projectSkills,
  skills,
  sql,
} from "@repo/db";
import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

/**
 * Tag repository providing database access for skills and tags taxonomy queries.
 */
export const tagRepository = {
  /**
   * Query skills and tags with optional category filtering, prefix search, and project counts.
   *
   * @param options - Query parameters including category, search prefix q, and limit.
   * @returns Array of tag items matching criteria.
   */
  async findTags(options: { category?: string; q?: string; limit: number }) {
    const { category, q, limit } = options;
    const conditions = [];

    if (category) {
      conditions.push(
        eq(sql`lower(${skills.category})`, category.toLowerCase()),
      );
    }

    if (q) {
      conditions.push(
        or(ilike(skills.name, `${q}%`), ilike(skills.slug, `${q}%`)),
      );
    }

    const query = db
      .select({
        id: skills.id,
        name: skills.name,
        slug: skills.slug,
        category: skills.category,
        projectCount:
          sql<number>`cast(count(${projectSkills.projectId}) as int)`.mapWith(
            Number,
          ),
      })
      .from(skills)
      .leftJoin(projectSkills, eq(skills.id, projectSkills.skillId));

    const results = await (
      conditions.length > 0 ? query.where(and(...conditions)) : query
    )
      .groupBy(skills.id, skills.name, skills.slug, skills.category)
      .orderBy(desc(sql`count(${projectSkills.projectId})`), asc(skills.name))
      .limit(limit);

    return results;
  },
};

/**
 * Route plugin exposing taxonomy and skill lookup endpoints.
 *
 * Provides autocomplete and filtering support across profile, project, and proposal views.
 *
 * @param app - Fastify instance on which tag routes are mounted.
 */
export const v1TagRoutes: FastifyPluginAsync = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/tags",
    {
      schema: {
        description:
          "Retrieve skills and tags for autocomplete and filter menus",
        tags: ["Tags"],
        querystring: tagsQuerySchema,
        response: {
          200: tagsResponseSchema,
        },
      },
    },
    async (request) => {
      const { category, q, limit } = request.query;
      const tags = await tagRepository.findTags({ category, q, limit });
      return { tags };
    },
  );
};
