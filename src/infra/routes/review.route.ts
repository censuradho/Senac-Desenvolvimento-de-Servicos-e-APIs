import { Router } from "express";

import { ReviewRepository } from "@/domain/repositories/review/Review.repository";
import { prisma } from "@/shared/PrismaClient";
import { ReviewController } from "@/infra/controllers/review.controller";
import { createReviewBodyValidationRequest } from "@/domain/middleware/review.validation";
import { jwtMiddleware } from "@/domain/middleware/auth.middleware";
import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";

const reviewRoute = Router()

const companyRepository = new CompanyRepository(prisma)
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