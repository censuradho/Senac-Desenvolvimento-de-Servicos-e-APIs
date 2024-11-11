import { Request, Response } from "express"

export  async function signOutMethod (req: Request, res: Response) {
    res.clearCookie('auth')
    req['company'] = undefined
    req['user'] = undefined
}