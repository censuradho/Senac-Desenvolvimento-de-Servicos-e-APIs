import { UserEntity } from '@/domain/entities/User.entity';
import { EmployerModel } from './Employer.model';
import { CandidateModel } from './Candidate.model';

type UserModelSchema = Pick<UserEntity,
  'email'
  | 'firstName'
  | 'id'
  | 'lastName'
  | 'role'
>

export class UserModel implements UserModelSchema {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;

  constructor (data: UserModelSchema) {
      this.email = data.email
      this.firstName = data.firstName
      this.id = data.id
      this.lastName = data.lastName
      this.role = data.role
  }
}

export class UserEmployerModel implements UserModel {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
  employer?: EmployerModel

  constructor (data: UserEmployerModel) {
    this.email = data.email
    this.firstName = data.firstName
    this.id = data.id
    this.lastName = data.lastName
    this.role = data.role
    this.employer = data.employer
  }
}

export class UserCandidateModel implements UserModel {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
  candidate?: CandidateModel

  constructor (data: UserCandidateModel) {
    this.email = data.email
    this.firstName = data.firstName
    this.id = data.id
    this.lastName = data.lastName
    this.role = data.role
    this.candidate = data.candidate
  }
}