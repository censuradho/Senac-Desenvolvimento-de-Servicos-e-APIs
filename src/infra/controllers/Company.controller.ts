import { HttpException } from "@/domain/models/HttpException";
import { JWTPayload } from "@/domain/models/JWTPayload";
import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";
import { Request, Response } from "express";

export class CompanyController {
  constructor (
    private repository: CompanyRepository
  ) {}

  async create(req: Request, res: Response) {
    try {
      await this.repository.create(req.user?.user_id as string, req.body)

      return res.sendStatus(201)
    } catch (error: any) {
      req.log.error(error)
      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = req.user as JWTPayload
      
      await this.repository.update(
        user.user_id, 
        req.body
      )

      return res.sendStatus(201)
    } catch (error: any) {
      req.log.error(error)
      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }
}