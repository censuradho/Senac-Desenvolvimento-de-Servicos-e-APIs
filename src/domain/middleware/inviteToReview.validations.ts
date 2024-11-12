import { NextFunction, Request, Response } from "express"
import { CreateInviteToReviewDTO } from "../dto/InviteToReview.dto"
import { validateOrReject } from "class-validator"

export async function createInviteToReviewSchemaValidation (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body) return res.status(400).json({
      message: 'MISSING_REQUEST_BODY'
    })

    const validation = new CreateInviteToReviewDTO()
    const body = req.body as CreateInviteToReviewDTO

    validation.validDays = body.validDays
    
    await validateOrReject(validation)

    req.body = validation
    next()

  } catch (error: any) {
    return res.status(400).json({
      message: Object.values(error[0].constraints)[0]
    })
  }
}