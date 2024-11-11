import { JsonWebTokenError } from 'jsonwebtoken';
import { ERRORS } from '@/shared/errors';
import { Jwt } from '@/shared/jwt';
import { signOutMethod } from '@/shared/utils/signOut';
import { NextFunction, Request, Response } from 'express';
import { JWTPayload, JWTPayloadCandidate, JWTPayloadEmployer } from '@/domain/models/JWTPayload';
import { UserRole } from '@/domain/dto/User.dto';''

export async function jwtMiddleware (req: Request<any, any, JWTPayload>, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.auth

    if (!token) return res.status(401).json({
      message: ERRORS.AUTH.PROVIDE_TOKEN
    })

    const payload = Jwt.verifyAccessToken(token) as JWTPayloadCandidate
  
    if (payload.userRole !== UserRole.CANDIDATE) {

      signOutMethod(req, res)

      return res
      .status(401)
      .json({
        message: ERRORS.AUTH.NOT_AUTHORIZED
      })
    } 

    req.user = payload

    next()
  } catch (error: any) {
    req.log.error(error)

    if (error instanceof JsonWebTokenError) {
      signOutMethod(req, res)

      return res.sendStatus(401)
    } 

    return res.sendStatus(500)
  }
}

export async function jwtMiddlewareEmployer (req: Request<any, any, JWTPayload>, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.auth

    if (!token) return res.status(401).json({
      message: ERRORS.AUTH.PROVIDE_TOKEN
    })

    const payload = Jwt.verifyAccessToken(token) as JWTPayloadEmployer
  
    if (payload.userRole !== UserRole.EMPLOYER) {

      signOutMethod(req, res)

      return res
      .status(401)
      .json({
        message: ERRORS.AUTH.NOT_AUTHORIZED
      })
    } 

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