import { PrismaClient } from "@prisma/client";
import { ICompanyUserRepository } from "./ICompanyUserRepository";
import { CreateCompanyUserDTO } from "@/domain/dto/CompanyUser.dto";

export class CompanyUserRepository implements ICompanyUserRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  async create (payload: CreateCompanyUserDTO) {}
}