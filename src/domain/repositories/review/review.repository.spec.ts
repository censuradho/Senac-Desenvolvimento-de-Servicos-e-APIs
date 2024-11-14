import { beforeEach, describe, expect, it } from "vitest";
import { Context, createMockContext, MockContext } from "@/__test__/setup";

import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";
import { InviteToReviewRepository } from "@/domain/repositories/InviteToReview/InviteToReview.repository";
import { EmployerRepository } from "@/domain/repositories/employer/EmployerRepository";
import { FileUploadService } from "@/domain/service/fileUpload/FileUpload.service";

import { ReviewRepository } from "./Review.repository";
import { createReviewDTOMock, reviewEntityMock } from "@/__mock__/review";
import { HttpException } from "@/domain/models/HttpException";
import { ERRORS } from "@/shared/errors";

describe('ReviewRepository', () => {
  let mock: MockContext
  let ctx: Context
  let repository: ReviewRepository
  let companyRepository: CompanyRepository
  let inviteToReviewRepository: InviteToReviewRepository

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context

    companyRepository = new CompanyRepository(
      ctx.prisma,
      new EmployerRepository(ctx.prisma),
      new FileUploadService()
    )
    repository = new ReviewRepository(
      ctx.prisma,
      companyRepository,
      inviteToReviewRepository
    )
  })

  describe('.create', () => {
    it ('Should throw an error if company is not found', async () => {
      mock.prisma.company.findFirst.mockResolvedValue(null)

      const request =  repository.create('sad', createReviewDTOMock)

      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          status: 404,
          message: ERRORS.COMPANY.NOT_FOUND
        })
      )
    })


    
  })

  describe ('findByCandidateId',  () => {
      it ('Should return reviews by candidate id', async () => {
        mock.prisma.review.findMany.mockResolvedValue([])

        const id = 'candidate_id'

        await repository.findByCandidateId(id)

        expect(mock.prisma.review.findMany).toHaveBeenCalledWith({
          where: {
            candidate_id: id
          }
        })
      })
  })
})