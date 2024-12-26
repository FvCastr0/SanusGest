import { Role } from "@prisma/client";

export default interface Employer {
  email: string,
  name: string,
  password: string,
  phone: number,
  role: Role
}
