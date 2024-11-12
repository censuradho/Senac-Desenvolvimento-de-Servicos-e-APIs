import { FileUploadService } from '@/domain/service/fileUpload/FileUpload.service';
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

import { CreateCompanyDTO } from "@/domain/dto/Company.dto";
import { EmployerAccessLevel } from "@/domain/entities/Employer.entity";
import { HttpException } from "@/domain/models/HttpException";

import { ERRORS } from "@/shared/errors";
import { ICompanyRepository } from "./ICompanyRepository";
import { EmployerRepository } from "../employer/EmployerRepository";
export class CompanyRepository implements ICompanyRepository {
  constructor (
    private prisma: PrismaClient,
    private employerRepository : EmployerRepository,
    private fileUploadService: FileUploadService
  ) {}

  async create (user_id: string, payload: CreateCompanyDTO) {
    const companyExist = await this.prisma.company.findFirst({
      where: {
        cnpj: payload.cnpj,
      }
    })

    const userAlreadyRelatedCompany = await this.employerRepository.findByUserId(user_id)

    if (userAlreadyRelatedCompany) throw new HttpException(400, ERRORS.EMPLOYER.ALREADY_HAVE_COMPANY_RELATED)

    if (companyExist) throw new HttpException(400, 'COMPANY_CNPJ_ALREADY_EXIST')

    await this.prisma.company.create({
      data: {
        id: randomUUID(),
        ...payload,
        users: {
          create: {
            id: randomUUID(),
            user_id,
            access_level: EmployerAccessLevel.ADMIN
          }
        }
      }
    })
  }

  async findById (id: string) {
    return this.prisma.company.findFirst({
      where: {
        id
      }
    })
  }

  async avatarUpload (
    companyId: string,
    file: Express.Multer.File
  ) {
    const company = await this.findById(companyId)

    if (company?.avatar) {
      await this.fileUploadService.removeFile(company.avatar)
    }

    await this.prisma.company.update({
      where: {
        id: companyId
      },
      data: {
        avatar: file.path
      }
    })    
  }
}