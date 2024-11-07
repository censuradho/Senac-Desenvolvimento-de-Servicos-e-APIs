import { PrismaClient } from "@prisma/client";
import { ICompanyRepository } from "./ICompanyRepository";
import { CreateCompanyDTO } from "@/domain/dto/Company.dto";
import { HttpException } from "@/domain/models/HttpException";
import { randomUUID } from "crypto";

export class CompanyRepository implements ICompanyRepository {
  constructor (
    private prisma: PrismaClient
  ) {}


  async create (payload: CreateCompanyDTO) {
    const companyExist = await this.prisma.company.findFirst({
      where: {
        cnpj: payload.cnpj
      }
    })

    if (companyExist) throw new HttpException(400, 'COMPANY_CNPJ_ALREADY_EXIST')

    await this.prisma.company.create({
      data: {
        id: randomUUID(),
        cnpj: payload.cnpj,
        name: payload.name,
        site: payload.site,
        type: payload.type,
      }
    })
  }
}