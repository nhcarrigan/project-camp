import { db } from "@repo/db";
import type { FastifyPluginAsync } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";


const v1ProjectsResponseSchema = z.object({
    q: z.string().optional(),
    tags: z.string(),
    status: z.enum(["proposed","voting", "active", "completed", "archived"]).default("active"),
    recommended: z.boolean().optional(),
    followed: z.boolean().optional(), 
    sort: z.enum(["recent","votes","followers","title"]).default("recent"),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20)
});


export const v1ProjectRoutes: FastifyPluginAsync = async (app) => {
    app.withTypeProvider<ZodTypeProvider>().get(
        "/projects",
        {
            schema: {
				description: "API v1 projects endpoint",
				tags: ["Projects"],
				response: {
					200: v1ProjectsResponseSchema,
				},
			},  
        },
        async () => {
           // const result = await db.$client.query("Select *"); 
          //  return result; 
        }
    ); 
}; 