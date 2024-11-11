import { NextFunction, Request, Response } from "express";
import { CreateReviewDTO } from "../dto/Review.dto";
import { validateOrReject } from "class-validator";

export async function createReviewBodyValidationRequest (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body) return res.status(400).json({
      message: 'MISSING_REQUEST_BODY'
    })

    const validation = new CreateReviewDTO()
    const body = req.body as CreateReviewDTO

    validation.category = body.category
    validation.company_id = body.company_id
    validation.description = body.description
    validation.jobLink = body.jobLink
    validation.jobTitle = body.jobTitle
    validation.nps = body.nps

    await validateOrReject(validation)

    req.body = validation
    next()

  } catch (error: any) {
    return res.status(400).json({
      message: Object.values(error[0].constraints)[0]
    })
  }
}