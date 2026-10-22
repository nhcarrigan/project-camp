import type { FastifyPluginAsync } from "fastify";
import { v1HealthRoutes } from "./health";
import { v1ProjectRoutes } from "./projects";

export const v1Routes: FastifyPluginAsync = async (app) => {
  await app.register(v1HealthRoutes);
  await app.register(v1ProjectRoutes);
};
