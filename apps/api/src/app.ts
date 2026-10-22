import sensible from "@fastify/sensible";
import Fastify from "fastify";
import { registerCors } from "./plugins/cors";
import { registerSwagger } from "./plugins/swagger";
import { healthRoutes } from "./routes/health";
import { v1Routes } from "./routes/v1/index";

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: process.env.NODE_ENV === "test" ? "silent" : "info",
    },
  });

  await app.register(sensible);
  await registerCors(app);
  await registerSwagger(app);

  // Root unversioned health check
  await app.register(healthRoutes);

  // API v1 versioned routes
  await app.register(v1Routes, { prefix: "/api/v1" });

  return app;
}
