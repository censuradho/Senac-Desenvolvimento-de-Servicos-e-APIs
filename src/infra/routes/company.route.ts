import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";
import { prisma } from "@/shared/PrismaClient";
import { Router } from "express";
import { CompanyController } from "../controllers/Company.controller";
import { jwtMiddleware, jwtMiddlewareEmployer } from "@/domain/middleware/auth.middleware";
import { createCompanyRequestBodyValidation } from "@/domain/middleware/company.validations";
import { uploadSingleFileMiddleware } from "@/domain/middleware/fileUpload.middleware";

const companyRoute = Router()

const repository = new CompanyRepository(prisma)
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
  '/company/:id/avatar',
  jwtMiddlewareEmployer,
  uploadSingleFileMiddleware,
  controller.uploadAvatar.bind(controller)
)

export {
  companyRoute
}