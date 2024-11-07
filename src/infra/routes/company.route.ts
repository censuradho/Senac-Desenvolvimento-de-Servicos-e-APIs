import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";
import { prisma } from "@/shared/PrismaClient";
import { Router } from "express";
import { CompanyController } from "../controllers/Company.controller";
import { jwtMiddleware } from "@/domain/middleware/auth.middleware";
import { createCompanyRequestBodyValidation } from "@/domain/middleware/company.validations";
import { checkCompanyUserRole } from "@/domain/middleware/user.validations";

const companyRoute = Router()

const repository = new CompanyRepository(prisma)
const controller = new CompanyController(repository)

companyRoute.post(
  '/company',
  jwtMiddleware,
  createCompanyRequestBodyValidation,
  controller.create.bind(controller)
)

companyRoute.put(
  '/company',
  jwtMiddleware,
  createCompanyRequestBodyValidation,
  controller.create.bind(controller)
)

export {
  companyRoute
}