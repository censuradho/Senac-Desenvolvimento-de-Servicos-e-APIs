// custom.d.ts
import 'express';
import { JWTPayload, JWTPayloadCandidate, JWTPayloadEmployer } from '../../domain/models/JWTPayload';


declare global {
  namespace Express {
    interface Request {
      user?: JWTPayloadCandidate;
      company?: JWTPayloadEmployer
    }
  }
}