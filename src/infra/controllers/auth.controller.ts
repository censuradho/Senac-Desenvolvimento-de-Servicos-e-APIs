import { Request, Response } from 'express';
import { addDays } from 'date-fns'

import { AuthRepository } from '@/domain/repositories/auth/AuthRepository';
import { HttpException } from '@/domain/models/HttpException';

import { ERRORS } from '@/shared/errors';

export class AuthController {
  constructor (private authRepository: AuthRepository) {}

  async signUpWithEmailAndPAssword (req: Request, res: Response) {
    try {
      await this.authRepository.signUpWithEmailAndPassword(req.body)

      return res.sendStatus(201)

    } catch (error: any) {
      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async signInWithEmailAndPassword (req: Request, res: Response) {
    try {

      const token = await this.authRepository.signInWithEmailAndPassword(req.body)

      res.cookie('auth', token, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        sameSite: 'strict',
        expires: addDays(new Date(), 2)
      })

      res.sendStatus(200)

    } catch (error: any) {
      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      console.log(error)
      return res.sendStatus(500)    
    }
  }

  async signOut (req: Request, res: Response) {
    res.clearCookie('auth')
    return res.sendStatus(200)
  }

  async me (req: Request, res: Response) {
    if (!req?.user) return res.status(401).json({
      message: ERRORS.AUTH.PROVIDE_TOKEN
    })

    const user = await this.authRepository.me(req?.user?.user_id)

    if (!user) return res.status(401).json({
      message: ERRORS.AUTH.PROVIDE_TOKEN
    })

    return res.json(user)
  }
}