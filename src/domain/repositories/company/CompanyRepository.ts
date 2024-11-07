import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

import { CreateCompanyDTO } from "@/domain/dto/Company.dto";
import { HttpException } from "@/domain/models/HttpException";

import { CompanyUserAccessLevel } from "@/domain/entities/CompanyUser.entity";

import { ICompanyRepository } from "./ICompanyRepository";
import { ERRORS } from "@/shared/errors";
export class CompanyRepository implements ICompanyRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  
  async create (user_id: string, payload: CreateCompanyDTO) {
    const companyExist = await this.prisma.company.findFirst({
      where: {
        cnpj: payload.cnpj
      }
    })

    if (companyExist) throw new HttpException(400, 'COMPANY_CNPJ_ALREADY_EXIST')

    await this.prisma.company.create({
      data: {
        id: randomUUID(),
        ...payload,
        users: {
          create: {
            id: randomUUID(),
            user_id,
            access_level: CompanyUserAccessLevel.ADMIN
          }
        }
      }
    })
  }

  async update (
    user_id: string,
    payload: CreateCompanyDTO
  ) {

    const companyExist= await this.prisma.company.findFirst({
      where: {
         
      }
    })

    if (companyExist) throw new HttpException(400, ERRORS.COMPANY.CNPJ_ALREADY_EXIST)
  }
}