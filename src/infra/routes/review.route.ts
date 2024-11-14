import { Router } from "express";

import { prisma } from "@/shared/PrismaClient";

import { ReviewController } from "@/infra/controllers/review.controller";

import { ReviewRepository } from "@/domain/repositories/review/Review.repository";
import { createReviewBodyValidationRequest } from "@/domain/middleware/review.validation";
import { jwtMiddleware } from "@/domain/middleware/auth";
import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";
import { EmployerRepository } from "@/domain/repositories/employer/EmployerRepository";
import { FileUploadService } from "@/domain/service/fileUpload/FileUpload.service";
import { InviteToReviewRepository } from "@/domain/repositories/InviteToReview/InviteToReview.repository";

const reviewRoute = Router()

const fileUploadService = new FileUploadService()
const employerRepository = new EmployerRepository(prisma)
const companyRepository = new CompanyRepository(
  prisma, 
  employerRepository, 
  fileUploadService
)
const inviteToReviewRepository = new InviteToReviewRepository(prisma)

const repository = new ReviewRepository(
  prisma, 
  companyRepository,
  inviteToReviewRepository
)

const controller = new ReviewController(repository)

reviewRoute.post(
  '/review',
  jwtMiddleware,
  createReviewBodyValidationRequest,
  controller.create.bind(controller)
)

reviewRoute.get(
  '/review',
  jwtMiddleware,
  controller.findMyReviews.bind(controller)
)

export {
  reviewRoute 
}