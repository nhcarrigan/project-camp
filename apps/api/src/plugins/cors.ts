import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import { env } from "../config/env.js";

/**
 * Configures and registers Cross-Origin Resource Sharing (CORS) middleware on the Fastify application.
 *
 * This plugin helper exists to regulate cross-origin HTTP requests made by client applications
 * (such as the Next.js web frontend in `apps/web`) to the Fastify API. It reads the allowed origin
 * rules from environment configuration (`CORS_ORIGIN`), dynamically allowing wildcard access or
 * a delimited list of authorized origins, while managing whether cookie/authorization credentials
 * are permitted.
 *
 * @param app - Fastify instance on which the CORS plugin is registered.
 */
export async function registerCors(app: FastifyInstance) {
  await app.register(cors, {
    origin: env.CORS_ORIGIN === "*" ? "*" : env.CORS_ORIGIN.split(","),
    credentials: env.CORS_ORIGIN !== "*",
  });
}
