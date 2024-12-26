import { employerRoutes } from "@routes/employer";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

const routes = (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  new employerRoutes().route(fastify);
}

export default routes
