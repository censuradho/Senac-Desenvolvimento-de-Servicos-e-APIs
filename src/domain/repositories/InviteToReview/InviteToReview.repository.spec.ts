import { createInviteToReviewPayloadMock, inviteToReviewEntityMock } from "@/__mock__/invite";
import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { HttpException } from "@/domain/models/HttpException";
import { ERRORS } from "@/shared/errors";
import { subDays } from 'date-fns';
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InviteToReviewRepository } from "./InviteToReview.repository";

describe('InviteToReviewRepository', () => {
  let mock: MockContext
  let ctx: Context
  let repository: InviteToReviewRepository

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context
    repository = new InviteToReviewRepository(ctx.prisma)
  })

  describe('.findById', () => {
    it('Should return invite by id', async () => {
      mock.prisma.inviteToReview.findFirst.mockResolvedValue(inviteToReviewEntityMock)

      const entity = await repository.findById(inviteToReviewEntityMock.id)

      expect(mock.prisma.inviteToReview.findFirst).toHaveBeenCalledWith({
        where: {
          id: inviteToReviewEntityMock.id
        }
      })
      expect(entity).toStrictEqual(inviteToReviewEntityMock)
    })

    it ('Should return null if there is not invite based on id provided', async () => {
      mock.prisma.inviteToReview.findFirst.mockResolvedValue(null)

      const entity = await repository.findById(inviteToReviewEntityMock.id)

      expect(mock.prisma.inviteToReview.findFirst).toHaveBeenCalledWith({
        where: {
          id: inviteToReviewEntityMock.id
        }
      })
      expect(entity).toBe(null)
    })
  })

  describe('.create', () => {
    it ('Should create a new invite', async () => {
      await repository.create('employ_id', createInviteToReviewPayloadMock)

      expect(mock.prisma.inviteToReview.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          validDays: createInviteToReviewPayloadMock.validDays,
          employer_id: 'employ_id',
        }
      })
    })
  })

  describe('.markAsAnswered', () => {
    it ('Should mark invite as answered', async () => {
      const inviteId = 'inviteId'
      const reviewId = 'reviewId' 

      await repository.markAsAnswered(inviteId, reviewId)

      expect(mock.prisma.inviteToReview.update).toHaveBeenCalledWith({
        where: {
          id: inviteId
        },
        data: {
          answered: true,
          updatedAt: expect.any(Date),
          review: {
            connect: {
              id: reviewId
            }
          }
        }
      })
    })
  })

  describe('.validate', () => {
    it ('Should throw an exception if there is not invite with same id provided', async () => {
      mock.prisma.inviteToReview.findFirst.mockResolvedValue(null)

      const inviteId = 'inviteId'

      const findByIdMethodMock = vi.spyOn(
        repository,
        'findById'
      )

      const request = repository.validate(inviteId)
    
      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          status: 400,
          message: ERRORS.INVITE.NOT_FOUND
        })
      )
      expect(findByIdMethodMock).toBeCalled()
    })

    it ('Should throw an exception if current date limit is after createdAt + validDays property', async () => {
      const oneDayAfterLimit = subDays(new Date(), inviteToReviewEntityMock.validDays + 3)

      mock.prisma.inviteToReview.findFirst.mockResolvedValue({
        ...inviteToReviewEntityMock,
        createdAt: oneDayAfterLimit
      })

      const request = repository.validate('id')

      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          status: 400,
          message: ERRORS.INVITE.EXPIRED
        })
      )
    })
    it('Should throw an exception if invite already answered', async () => {
      mock.prisma.inviteToReview.findFirst.mockResolvedValue({
        ...inviteToReviewEntityMock,
       answered: true
      })

      const request = repository.validate('id')

      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          status: 400,
          message: ERRORS.INVITE.ALREADY_ANSWER
        })
      )
    })

    it('Should not throw exception if is a valid invite', async () => {
      mock.prisma.inviteToReview.findFirst.mockResolvedValue(inviteToReviewEntityMock)
      const isValid = await repository.validate(inviteToReviewEntityMock.id)

      expect(isValid).toBe(true)
    })
  })
})