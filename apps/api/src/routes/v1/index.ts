import type { FastifyPluginAsync } from "fastify";
import { v1HealthRoutes } from "./health";
import { v1ProjectRoutes } from "./projects";
import { v1TagRoutes } from "./tags";

export const v1Routes: FastifyPluginAsync = async (app) => {
  await app.register(v1HealthRoutes);
  await app.register(v1ProjectRoutes);
  await app.register(v1TagRoutes);
};
