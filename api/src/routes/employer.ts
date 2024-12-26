import CreateEmployer from "@controllers/employer/CreateEmployer";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

class employerRoutes {
  async route(fastify: FastifyInstance) {
    fastify.post("/employer", (req: FastifyRequest, rep: FastifyReply) => {
      return CreateEmployer.handle(req, rep);
    })
  }
}


export { employerRoutes };

