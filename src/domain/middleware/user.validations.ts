 
import { NextFunction, Request, Response } from 'express'
import { CreateUserDTO } from '../dto/User.dto'
import { validateOrReject } from 'class-validator'

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