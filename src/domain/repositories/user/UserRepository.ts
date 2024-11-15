import bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';

import { CreateUserDTO, UserRole } from '@/domain/dto/User.dto';
import { UserEntity } from '@/domain/entities/User.entity';
import { HttpException } from '@/domain/models/HttpException';
import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './IUserRepository';
import { ERRORS } from '@/shared/errors';

export class UserRepository implements IUserRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prisma.user.findFirst({
      where: {
        email
      }
    })
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.prisma.user.findFirst({
      where: {
        id
      }
    })
  }


  async create (role: UserRole, payload: CreateUserDTO): Promise<string> {
    const userAlreadyExist = await this.findByEmail(payload.email)

    const { password, ...otherPayload } = payload

    if (userAlreadyExist) throw new HttpException(400, ERRORS.USER.ALREADY_EXIST)

    const hashPassword = await bcrypt.hash(password, 10)
    const id = randomUUID()
  
    await this.prisma.user.create({
      data: {
        id,
        ...otherPayload,
        password: hashPassword,
        role
      }
    })

    return id
  }
}