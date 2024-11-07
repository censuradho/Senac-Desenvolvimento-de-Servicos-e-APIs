// custom.d.ts
import 'express';
import { JWTPayload } from '../../domain/models/JWTPayload';


declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}