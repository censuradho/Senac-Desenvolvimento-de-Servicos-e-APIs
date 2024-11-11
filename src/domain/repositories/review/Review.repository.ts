import { CompanyRepository } from '@/domain/repositories/company/CompanyRepository';
import { PrismaClient } from "@prisma/client";
import { IReviewRepository } from "./IReview.repository";
import { CreateReviewDTO } from "@/domain/dto/Review.dto";
import { randomUUID } from "node:crypto";
import { HttpException } from '@/domain/models/HttpException';
import { ERRORS } from '@/shared/errors';

export class ReviewRepository implements IReviewRepository {
  constructor (
    private prisma: PrismaClient,
    private companyRepository: CompanyRepository
  ) {}

  async create(candidate_id: string, payload: CreateReviewDTO) {
    const companyExist = await this.companyRepository.findById(payload.company_id)

    if (!companyExist) throw new HttpException(404, ERRORS.COMPANY.NOT_FOUND)
      
    await this.prisma.review.create({
      data: {
        id: randomUUID(),
        category: payload.category,
        description: payload?.description,
        jobTitle: payload.jobTitle,
        nps: payload.nps,
        jobLink: payload.jobLink,
        candidate_id,
        company_id: payload.company_id
      }
    })
  }
}