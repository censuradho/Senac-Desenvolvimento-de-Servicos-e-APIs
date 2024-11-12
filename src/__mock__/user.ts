import { CreateUserDTO, UserRole } from "@/domain/dto/User.dto";
import { UserEntity } from "@/domain/entities/User.entity";
import { randomUUID } from "crypto";

export const createUserPayload: CreateUserDTO = {
  email: 'email@email.com',
  firstName: 'firstName',
  lastName: 'lastName',
  password: 'password'
}

export const useCandidateMock: UserEntity[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'email@email.com',
    firstName: 'firstName',
    lastName: 'lastName',
    password: 'hash',
    id: randomUUID(),
    role: UserRole.CANDIDATE
  }
]