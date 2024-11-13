import { SignInWithEmailAndPAsswordDTO } from "@/domain/dto/Auth.dto";
import { CreateUserDTO, UserRole } from "@/domain/dto/User.dto";
import { UserEntity } from "@/domain/entities/User.entity";
import { randomUUID } from "crypto";

export const createUserPayload: CreateUserDTO = {
  email: 'email@email.com',
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'passwordasdasd'
}

export const useCandidateMock: UserEntity[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'email@email.com',
    firstName: 'firstName',
    lastName: 'lastName',
    password: '$2b$10$gDh9nnInFPhMVXxmbc.JuOpkypDWMlYxOlm48TkR/NhV31RyvqoFG',
    id: randomUUID(),
    role: UserRole.CANDIDATE
  }
]

export const userLoginPayload: SignInWithEmailAndPAsswordDTO = {
  email: 'email@email.com',
  password: 'passwordasdasd'
}