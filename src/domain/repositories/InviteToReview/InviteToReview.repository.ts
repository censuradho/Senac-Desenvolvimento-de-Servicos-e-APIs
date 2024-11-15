import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { addDays, isBefore } from 'date-fns'

import { CreateInviteToReviewDTO } from "@/domain/dto/InviteToReview.dto";
import { HttpException } from "@/domain/models/HttpException";
import { ERRORS } from "@/shared/errors";

import { IInviteToReviewRepository } from "./IInviteToReview.repository";

export class InviteToReviewRepository implements IInviteToReviewRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  async findById (id: string) {
    return this.prisma.inviteToReview.findFirst({
      where: {
        id
      }
    })
  }

  async create (employer_id: string, payload: CreateInviteToReviewDTO) {
    await this.prisma.inviteToReview.create({
      data: {
        id: randomUUID(),
        validDays: payload.validDays,
        employer_id
      }
    })
  }

  async markAsAnswered (id: string, reviewId: string) {
    await this.prisma.inviteToReview.update({
      where: {
        id
      },
      data: {
        answered: true,
        updatedAt: new Date(),
        review: {
          connect: {
            id: reviewId
          }
        }
      }
    })
  }

  async validate (id: string) {
    const invite = await this.findById(id)

    if (!invite) throw new HttpException(400, ERRORS.INVITE.NOT_FOUND)

    const dateLimit = addDays(invite.createdAt, invite.validDays)

    const isValidDate = isBefore(new Date(), dateLimit)

    if (!isValidDate) throw new HttpException(400, ERRORS.INVITE.EXPIRED)

    if (invite.answered) throw new HttpException(400, ERRORS.INVITE.ALREADY_ANSWER)

    return true
  }
}