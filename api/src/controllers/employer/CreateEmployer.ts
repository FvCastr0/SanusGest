import Employer from "@interfaces/Employer";
import createEmployerService from "@services/employer/createEmployerService";
import { hashSync } from "bcrypt-ts";
import { FastifyReply, FastifyRequest } from "fastify";

class CreateEmployer {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { name, phone, email, role, password } = req.body as Employer

    if (
      name.length === 0 ||
      phone <= 0 ||
      email.length === 0 ||
      role.length === 0 ||
      password.length === 0
    ) return rep.code(404).send({ msg: "Você tem que preencher todos os campos!" })

    if (
      role !== 'Doutor' &&
      role !== 'Gerente' &&
      role !== 'Funcionario'
    ) return rep.code(400).send({ msg: "Cargo não existente!" })

    const create = await createEmployerService.execute({ name, email, password: hashSync(password, 10), phone, role })

    return rep.code(create.status).send({ msg: create.msg })
  }
}

export default new CreateEmployer();
