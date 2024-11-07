import { NextFunction, Request, Response } from 'express';
import { SignInWithEmailAndPAsswordDTO } from '../dto/Auth.dto';
import { validateOrReject } from 'class-validator';

export async function signInWithEmailAndPasswordRequestBodyValidation (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body) return res.status(400).json({
      message: 'Missing request body'
    })

    const payload = new SignInWithEmailAndPAsswordDTO()

    const body = req.body as SignInWithEmailAndPAsswordDTO

    Object.assign(payload, {
      email: body.email,
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