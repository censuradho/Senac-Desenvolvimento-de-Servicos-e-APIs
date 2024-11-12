import { HttpException } from "@/domain/models/HttpException";
import { JWTPayloadEmployer } from "@/domain/models/JWTPayload";
import { CompanyRepository } from "@/domain/repositories/company/CompanyRepository";
import { ERRORS } from "@/shared/errors";
import { Request, Response } from "express";

export class CompanyController {
  constructor (
    private repository: CompanyRepository
  ) {}

  async create(req: Request, res: Response) {
    try {
      const id = await this.repository.create(req.company?.user_id as string, req.body)

      const user = req.company as JWTPayloadEmployer

      req.company = {
        ...(user && user),
        companyId: id
      }

      return res.sendStatus(201)
    } catch (error: any) {
      req.log.error(error)
      if (error instanceof HttpException) {
        return res.status(error.status).json({ message: error.message })
      }

      return res.sendStatus(500)    
    }
  }

  async uploadAvatar (req: Request, res: Response) {
    if (!req.file) return res
      .status(400)
      .json({
        message: ERRORS.FILE.FILE_IS_REQUIRED
      })

    const companyId = req.company?.companyId!!

    await this.repository.avatarUpload(companyId, req.file)
    return res.sendStatus(200)
  }
}