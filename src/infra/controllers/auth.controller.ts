import { UserRole } from '@/domain/dto/User.dto';
import { Request, Response } from 'express';
import { addDays } from 'date-fns'

import { AuthRepository } from '@/domain/repositories/auth/AuthRepository';
import { HttpException } from '@/domain/models/HttpException';

import { ERRORS } from '@/shared/errors';
import { JWTPayloadEmployer } from '@/domain/models/JWTPayload';

export class AuthController {
  constructor (private authRepository: AuthRepository) {}

  generateAuthCookie (cookie: string, res: Response) {
    res.cookie('auth', cookie, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      sameSite: 'strict',
      expires: addDays(new Date(), 2)
    })
  }

  async signUpWithEmailAndPAsswordCandidate (req: Request, res: Response) {
    try {
      await this.authRepository.signUpWithEmailAndPassword(UserRole.CANDIDATE, req.body)

      return res.sendStatus(201)

    } catch (error: any) {
      req.log.error(error)
      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async signUpWithEmailAndPAsswordEmployer (req: Request, res: Response) {
    try {
      await this.authRepository.signUpWithEmailAndPassword(UserRole.EMPLOYER, req.body)

      return res.sendStatus(201)

    } catch (error: any) {
      req.log.error(error)

      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async signInWithEmailAndPasswordEmployer (req: Request, res: Response) {
    try {

      const token = await this.authRepository.signInWithEmailAndPasswordEmployer(req.body)

      this.generateAuthCookie(token, res)

      res.sendStatus(200)

    } catch (error: any) {
      req.log.error(error)

      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async signInWithEmailAndPasswordCandidate (req: Request, res: Response) {
    try {

      const token = await this.authRepository.signInWithEmailAndPasswordCandidate(req.body)

      this.generateAuthCookie(token, res)

      res.sendStatus(200)

    } catch (error: any) {
      req.log.error(error)

      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async signOut (req: Request, res: Response) {
    res.clearCookie('auth')
    req['company'] = undefined
    req['user'] = undefined
    return res.sendStatus(200)
  }

  async me (req: Request, res: Response) {
    try {
      if (!req?.user) return res.status(401).json({
        message: ERRORS.AUTH.PROVIDE_TOKEN
      })
  
      const user = await this.authRepository.me(req?.user?.user_id)
  
      if (!user) return res.status(401).json({
        message: ERRORS.AUTH.PROVIDE_TOKEN
      })
  
      return res.json(user)
    } catch (error: any) {
      req.log.error(error)

      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async meEmployer (req: Request, res: Response) {
    try {
      const jwtPayload = req.company as JWTPayloadEmployer

      const me = await this.authRepository.meEmployer(jwtPayload.user_id)
  
      if (!me) return res.status(401).json({
        message: ERRORS.AUTH.PROVIDE_TOKEN
      })
  
      return res.json(me)
    } catch (error: any) {
      req.log.error(error)

      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }
}