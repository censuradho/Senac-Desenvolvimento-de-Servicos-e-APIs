import { CreateUserDTO, UserRole } from './../../dto/User.dto';
import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { beforeEach, describe, expect, it } from "vitest";
import { UserRepository } from "./UserRepository";
import { randomUUID } from "crypto";
import { createUserPayload, useCandidateMock } from "@/__mock__/user";
import { HttpException } from '@/domain/models/HttpException';
import { ERRORS } from '@/shared/errors';
import bcrypt from 'bcrypt';

describe('UserRepository', () => {
  let mock: MockContext
  let ctx: Context
  let repository: UserRepository

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context
    repository = new UserRepository(ctx.prisma)
  })

  it ('Should find user by email', async () => {
    const email = 'email@email.com'

    await repository.findByEmail(email)

    expect(mock.prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        email
      }
    })
  })

  it ('Should find user by id', async () => {
    const id = randomUUID()

    await repository.findById(id)

    expect(mock.prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        id
      }
    })
  })

  describe('create method', () => {
    const [user] = useCandidateMock

    it ('Should throw an exception if try to register 2 users with same email', async () => {
      mock.prisma.user.findFirst.mockResolvedValue(user)
      
      await expect(
        repository.create(
          UserRole.CANDIDATE, 
          createUserPayload
        )
      )
      .rejects
      .toThrowError(
        expect.objectContaining({
          status: 400,
          message: ERRORS.USER.ALREADY_EXIST
        })
      )
    })

    it ('Should create a user', async () => {
      mock.prisma.user.findFirst.mockResolvedValue(null)


      const id = await repository.create(UserRole.CANDIDATE, createUserPayload)

      expect(mock.prisma.user.create).toBeCalled()
      expect(id).toBeTruthy()
    })

  })
})