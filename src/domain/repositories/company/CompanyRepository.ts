import { PrismaClient } from "@prisma/client";
import { ICompanyRepository } from "./ICompanyRepository";

export class CompanyRepository implements ICompanyRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  

}