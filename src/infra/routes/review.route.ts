import { Router } from "express";

import { prisma } from "@/shared/PrismaClient";

import { ReviewController } from "@/infra/controllers/review.controller";

import { ReviewRepository } from "@/domain/repositories/review/Review.repository";
import { createReviewBodyValidationRequest } from "@/domain/middleware/review.validation";
import { jwtMiddleware } from "@/domain/middleware/auth.middleware";
import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";
import { EmployerRepository } from "@/domain/repositories/employer/EmployerRepository";
import { FileUploadService } from "@/domain/service/fileUpload/FileUpload.service";

const reviewRoute = Router()

const fileUploadService = new FileUploadService()
const employerRepository = new EmployerRepository(prisma)
const companyRepository = new CompanyRepository(
  prisma, 
  employerRepository, 
  fileUploadService
)

const repository = new ReviewRepository(
  prisma, 
  companyRepository
)

const controller = new ReviewController(repository)

reviewRoute.post(
  '/review',
  jwtMiddleware,
  createReviewBodyValidationRequest,
  controller.create.bind(controller)
)

export {
  reviewRoute 
}