 
import { NextFunction, Request, Response } from 'express'
import { CreateUserDTO, UserRole } from '../dto/User.dto'
import { validateOrReject } from 'class-validator'
import { JWTPayload } from '../models/JWTPayload'
import { ERRORS } from '@/shared/errors'

export async function createUserValidation (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body) return res.status(400).json({
      message: 'Missing request body'
    })

    const payload = new CreateUserDTO()

    const body = req.body as CreateUserDTO

    Object.assign(payload, {
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    })

    await validateOrReject(payload)

    req.body = payload

    next()
  } catch (error: any) {
    return res.status(400).json({
      message: Object.values(error[0].constraints)[0]
    })
  }
}


export async function checkCompanyUserRole (req: Request, res: Response, next: NextFunction) {
  const user = req.user

  if (user?.userRole !== UserRole.CANDIDATE) 
      return res
        .status(401)
        .json({
          message: ERRORS.USER.NOT_ALLOW
        })

  next()
}