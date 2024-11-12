import { Router } from "express";

import { jwtMiddlewareEmployer } from "@/domain/middleware/auth.middleware";
import { createCompanyRequestBodyValidation } from "@/domain/middleware/company.validations";
import { uploadSingleFileMiddleware } from "@/domain/middleware/fileUpload.middleware";
import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";

import { prisma } from "@/shared/PrismaClient";

import { CompanyController } from "@/infra/controllers/Company.controller";
import { EmployerRepository } from "@/domain/repositories/employer/EmployerRepository";
import { FileUploadService } from "@/domain/service/fileUpload/FileUpload.service";

const companyRoute = Router()

const fileUploadService = new FileUploadService()
const employerRepository = new EmployerRepository(prisma)
const repository = new CompanyRepository(
  prisma, 
  employerRepository,
  fileUploadService
)
const controller = new CompanyController(repository)

companyRoute.post(
  '/company',
  jwtMiddlewareEmployer,
  createCompanyRequestBodyValidation,
  controller.create.bind(controller)
)

companyRoute.put(
  '/company',
  jwtMiddlewareEmployer,
  createCompanyRequestBodyValidation,
  controller.create.bind(controller)
)

companyRoute.put(
  '/company/avatar',
  jwtMiddlewareEmployer,
  uploadSingleFileMiddleware,
  controller.uploadAvatar.bind(controller)
)

export {
  companyRoute
};

