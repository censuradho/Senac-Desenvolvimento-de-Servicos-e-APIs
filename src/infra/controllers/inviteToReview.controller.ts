import { Request, Response } from 'express';

import { JWTPayloadEmployer } from '@/domain/models/JWTPayload';
import { InviteToReviewRepository } from '@/domain/repositories/InviteToReview/InviteToReview.repository';
import { HttpException } from '@/domain/models/HttpException';
import { ERRORS } from '@/shared/errors';

export class InviteToReviewController {
  constructor (
    private inviteToReviewRepository: InviteToReviewRepository
  ) {}

  async create (req: Request, res: Response) {
    try {
      const user = req.company as JWTPayloadEmployer

      if (!user.employerId) return res
        .status(404)
        .json({
          message: ERRORS.AUTH.NOT_FOUND_EMPLOYER_RELATED_TO_AUTH_TOKEN
        })

      await this.inviteToReviewRepository.create(user.employerId, req.body)

      return res.sendStatus(201)

    } catch (error) {

      req.log.error(error)
      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

}