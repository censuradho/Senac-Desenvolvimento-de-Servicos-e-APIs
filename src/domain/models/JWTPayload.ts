import { UserRole } from "../dto/User.dto";

export class JWTPayload {
  constructor (
    public user_id: string,
    public userRole: UserRole
  ) {}
}

export class JWTPayloadEmployer implements JWTPayload {
  constructor (
    public user_id: string,
    public userRole: UserRole,
    public employerId?: string,
    public companyId?: string,
  ) {}
}

export class JWTPayloadCandidate implements JWTPayload {
  constructor (
    public user_id: string,
    public userRole: UserRole,
    public candidateId?: string
  ) {}
}