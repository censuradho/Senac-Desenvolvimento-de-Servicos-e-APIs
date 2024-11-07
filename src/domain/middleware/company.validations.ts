import { NextFunction, Request, Response } from 'express';
import { validateOrReject } from 'class-validator';
import { CreateCompanyDTO } from '../dto/Company.dto';

export async function createCompanyRequestBodyValidation (req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body) return res.status(400).json({
      message: 'MISSING_REQUEST_BODY'
    })

    const payload = new CreateCompanyDTO()

    const body = req.body as CreateCompanyDTO

    Object.assign(payload, {
      name: body.name,
      cnpj: body.cnpj,
      description: body.description,
      site: body.site,
      type: body.type,
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
