import { NextFunction, Request, Response } from "express";

import { ERRORS } from "@/shared/errors";
import { FileUploadService } from "@/domain/service/fileUpload/FileUpload.service";

export function uploadSingleFileMiddleware (req: Request, res: Response, next: NextFunction) {
  const repository = new FileUploadService()

  return repository.singleUpload('file')(req, res, error => {
    if (error) {

      req.log.error(error)

      return res
        .status(400)
        .json({
          message: ERRORS.FILE.ERROR_UPLOAD
        })
    }

    next();

  })
  next()
}