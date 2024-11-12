import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { CreateReviewDTO } from "@/domain/dto/Review.dto";
import { HttpException } from '@/domain/models/HttpException';
import { CompanyRepository } from '@/domain/repositories/company/CompanyRepository';
import { ERRORS } from '@/shared/errors';
import { IReviewRepository } from "./IReview.repository";
import { InviteToReviewRepository } from "../InviteToReview/InviteToReview.repository";

export class ReviewRepository implements IReviewRepository {
  constructor (
    private prisma: PrismaClient,
    private companyRepository: CompanyRepository,
    private inviteToReviewRepository: InviteToReviewRepository
  ) {}

  async create(candidateId: string, payload: CreateReviewDTO) {
    const companyExist = await this.companyRepository.findById(payload.company_id)

    if (!companyExist) throw new HttpException(404, ERRORS.COMPANY.NOT_FOUND)

    await this.inviteToReviewRepository.validate(payload.invite_id)

    const reviewId = randomUUID()

    await this.prisma.review.create({
      data: {
        id: reviewId,
        category: payload.category,
        description: payload?.description,
        jobTitle: payload.jobTitle,
        nps: payload.nps,
        jobLink: payload.jobLink,
        candidate_id: candidateId,
        company_id: payload.company_id,
        invite_id: payload.invite_id
      }
    })
  }

  async findByCandidateId (id: string) {
    return this.prisma.review.findMany({
      where: {
        candidate_id: id
      }
    })
  }
}