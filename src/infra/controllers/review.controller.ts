import { Request, Response } from 'express';

import { JWTPayloadCandidate } from '@/domain/models/JWTPayload';
import { ReviewRepository } from '@/domain/repositories/review/Review.repository';
import { HttpException } from '@/domain/models/HttpException';

export class ReviewController {
  constructor (
    private reviewRepository: ReviewRepository
  ) {}

  async create (req: Request, res: Response) {
    try {
      const user = req.user as JWTPayloadCandidate

      await this.reviewRepository.create(user.candidateId!!, req.body)
    } catch (error) {
      req.log.error(error)

      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }
}