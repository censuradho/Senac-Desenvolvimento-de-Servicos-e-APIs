import { Router } from "express";
import { InviteToReviewController } from "@/infra/controllers/inviteToReview.controller";

import { InviteToReviewRepository } from "@/domain/repositories/InviteToReview/InviteToReview.repository";
import { createInviteToReviewSchemaValidation } from "@/domain/middleware/inviteToReview.validations";
import { jwtMiddlewareEmployer } from "@/domain/middleware/auth.middleware";

import { prisma } from "@/shared/PrismaClient";

const inviteToReviewRoute = Router()

const repository = new InviteToReviewRepository(prisma)
const controller = new InviteToReviewController(repository)

inviteToReviewRoute.post(
  '/invite-to-review',
  jwtMiddlewareEmployer,
  createInviteToReviewSchemaValidation,
  controller.create.bind(controller)
)

export {
  inviteToReviewRoute
}