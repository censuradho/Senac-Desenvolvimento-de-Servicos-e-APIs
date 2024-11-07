import { Jwt } from '@/shared/jwt';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { JWTPayload } from '../models/JWTPayload';
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
    console.log(error)
    if (error instanceof JsonWebTokenError) {
      req['user'] = undefined

      return res.sendStatus(401)
    } 

    return res.sendStatus(500)
  }
}