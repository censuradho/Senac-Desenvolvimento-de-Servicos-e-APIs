import { Jwt } from '@/shared/jwt';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWTPayload, JWTPayloadEmployer } from '../models/JWTPayload';
import { ERRORS } from '@/shared/errors';

export async function jwtMiddleware (req: Request<any, any, JWTPayload>, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.auth

    if (!token) return res.status(401).json({
      message: ERRORS.AUTH.PROVIDE_TOKEN
    })

    const payload = Jwt.verifyAccessToken(token) as JWTPayload
  
    req.user = payload

    next()
  } catch (error: any) {
    req.log.error(error)

    if (error instanceof JsonWebTokenError) {
      req['user'] = undefined
      res.clearCookie('auth')

      return res.sendStatus(401)
    } 

    return res.sendStatus(500)
  }
}

export async function jwtMiddlewareCompanyUser (req: Request<any, any, JWTPayload>, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.auth

    if (!token) return res.status(401).json({
      message: ERRORS.AUTH.PROVIDE_TOKEN
    })

    const payload = Jwt.verifyAccessToken(token) as JWTPayloadEmployer
  
    req.company = payload

    next()
  } catch (error: any) {
    req.log.error(error)

    if (error instanceof JsonWebTokenError) {
      req['company'] = undefined
      res.clearCookie('auth')

      return res.sendStatus(401)
    } 

    return res.sendStatus(500)
  }
}