import { SignInWithEmailAndPAsswordDTO } from "@/domain/dto/Auth.dto";
import { CreateUserDTO, UserRole } from "@/domain/dto/User.dto";
import { UserEntity } from "@/domain/entities/User.entity";
import { UserCandidateModel, UserEmployerModel } from "@/domain/models/UserModel";
import { randomUUID } from "crypto";
import { candidateModelMock } from "./candidate";
import { employerModelMock } from "./employer";

export const createUserPayload: CreateUserDTO = {
  email: 'email@email.com',
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'passwordasdasd'
}


export const userCandidateEntityMock: UserEntity = {
  createdAt: new Date(),
  updatedAt: new Date(),
  email: 'email@email.com',
  firstName: 'firstName',
  lastName: 'lastName',
  password: '$2b$10$gDh9nnInFPhMVXxmbc.JuOpkypDWMlYxOlm48TkR/NhV31RyvqoFG',
  id: randomUUID(),
  role: UserRole.CANDIDATE
}

export const userCandidateModelMock = new UserCandidateModel({
  ...userCandidateEntityMock,
  candidate: candidateModelMock
})

export const userEmployerEntityMock: UserEntity = {
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'email@email.com',
    firstName: 'firstName',
    lastName: 'lastName',
    password: '$2b$10$gDh9nnInFPhMVXxmbc.JuOpkypDWMlYxOlm48TkR/NhV31RyvqoFG',
    id: randomUUID(),
    role: UserRole.EMPLOYER,
  }

export const userEmployerModelMock = new UserEmployerModel({
  ...userEmployerEntityMock,
  employer: employerModelMock
})

export const userLoginPayload: SignInWithEmailAndPAsswordDTO = {
  email: 'email@email.com',
  password: 'passwordasdasd'
}