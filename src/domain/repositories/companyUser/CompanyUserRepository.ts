import { PrismaClient } from "@prisma/client";
import { ICompanyUserRepository } from "./ICompanyUserRepository";

export class CompanyUserRepository implements ICompanyUserRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  findByUserId (user_id: string) {
    return this.prisma.companyUser.findFirst({
      where: {
        user_id
      }
    })
  }
}