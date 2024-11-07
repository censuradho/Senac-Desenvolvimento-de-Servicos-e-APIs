import { PrismaClient } from "@prisma/client";
import { IEmployerRepository } from "./IEmployerRepository";

export class EmployerRepository implements IEmployerRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  findByUserId (user_id: string) {
    return this.prisma.employer.findFirst({
      where: {
        user_id
      }
    })
  }
}