import Employer from "@interfaces/Employer";
import IResponse from "@interfaces/IResponse";
import { PrismaClient } from "@prisma/client";

class CreateEmployer {
  async execute({ email, name, password, phone, role }: Employer): Promise<IResponse> {
    const employer = new PrismaClient().employer;

    const verifyName = await employer.findUnique({
      where: { name }
    });
    const verifyEmail = await employer.findUnique({
      where: { email }
    });

    if (verifyName) return { msg: "Esse nome já está sendo utilizado", status: 401 }
    if (verifyEmail) return { msg: "Esse email já está sendo utilizado", status: 401 }

    try {
      await employer.create({
        data: {
          email,
          name,
          password,
          phone,
          role
        }
      })

      return {
        status: 201,
        msg: "Funcionário criado com sucesso!"
      }
    }
    catch (e) {
      return {
        status: 500,
        msg: "Internal server error",
        data: { e }
      }
    }
  }
}

export default new CreateEmployer();
