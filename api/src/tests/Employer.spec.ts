import CreateEmployer from "@controllers/employer/CreateEmployer";
import Employer from "@interfaces/Employer";
import createEmployerService from "@services/employer/createEmployerService";
import { FastifyReply, FastifyRequest } from "fastify";

jest.mock('@services/employer/createEmployerService');
jest.mock('bcrypt-ts', () => ({
  hashSync: jest.fn(() => 'hashedPassword')
}));

describe('Create Employer Controller', () => {
  // Nessa parte do código, está sendo criada o "handle" do Create Employer, onde está sendo passada os parâmetros da função
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = { body: {} as Employer };
    mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn()
    },
      jest.clearAllMocks();
  });
  // Finalização do "handle", agora haverá o começo dos testes.

  it('should return 404 if the mandatory fields are not filled in', async () => {
    mockRequest.body = {
      name: '',
      email: '',
      phone: '',
      password: '',
      role: ''
    };

    await CreateEmployer.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({
      msg: "Você tem que preencher todos os campos!"
    })
  });

  it('should return 400 if the role do not exist', async () => {
    mockRequest.body = {
      name: 'Admin',
      email: 'admin@email.com',
      phone: '5592993844710',
      password: '123',
      role: 'Desenvolvedor'
    };

    await CreateEmployer.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(mockReply.code).toHaveBeenCalledWith(400);
    expect(mockReply.send).toHaveBeenCalledWith({
      msg: "Cargo inexistente!"
    });
  });

  it('should return 201 if every informations are right, and create employer', async () => {
    mockRequest.body = {
      name: 'Admin',
      email: 'admin@email.com',
      phone: '5592993844710',
      password: '123',
      role: 'Gerente'
    };

    // Chamando o Create employer service para trazer o "status" e "msg",
    //  para completar com as informações do controller.
    (createEmployerService.execute as jest.Mock).mockResolvedValue({
      status: 201,
      msg: "Funcionario criado com sucesso!"
    })


    await CreateEmployer.handle(mockRequest as FastifyRequest, mockReply as FastifyReply);

    expect(createEmployerService.execute).toHaveBeenCalledWith({
      name: 'Admin',
      email: 'admin@email.com',
      phone: '5592993844710',
      password: 'hashedPassword',
      role: 'Gerente'
    });
    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith({
      msg: 'Funcionario criado com sucesso!',
    });
  })
})
