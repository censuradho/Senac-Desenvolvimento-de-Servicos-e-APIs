import { createUserPayload, useCandidateMock, userLoginPayload } from "@/__mock__/user";
import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { beforeEach, describe, expect, it } from "vitest";
import { CandidateRepository } from "../candidate/Candidate.repository";
import { EmployerRepository } from "../employer/EmployerRepository";
import { UserRepository } from "../user/UserRepository";
import { AuthRepository } from "./AuthRepository";
import { ERRORS } from "@/shared/errors";
import { HttpException } from "@/domain/models/HttpException";
import { hash } from 'bcrypt'

describe('AuthRepository', () => {
  let mock: MockContext
  let ctx: Context
  let repository: AuthRepository

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context
    repository = new AuthRepository(
      new UserRepository(ctx.prisma),
      new EmployerRepository(ctx.prisma),
      new CandidateRepository(ctx.prisma)
    )
  })

  describe('signInWithEmailAndPasswordCandidate', async () => {
    it ('Should throw an exception if user was not founded by email', async () => {
      mock.prisma.user.findFirst.mockResolvedValue(null)

      const request = repository.signInWithEmailAndPasswordCandidate(
        userLoginPayload
      )

      await expect(request)
        .rejects
        .toBeInstanceOf(HttpException)

      await expect(request)
        .rejects
        .toThrowError(
          expect.objectContaining({
            status: 404,
            message: ERRORS.USER.NOT_FOUND
          })
        )
    })

    it ('Should throw an exception if password not match', async () => {
      const [user] = useCandidateMock

      mock.prisma.user.findFirst.mockResolvedValue({
        ...user,
        password: 'senha_salva_sem_hash'
      })

      const request = repository.signInWithEmailAndPasswordCandidate(createUserPayload)
    
      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          message: ERRORS.USER.INCORRECT_PASSWORD_OR_EMAIL,
          status: 401
        })
      )
    })

    it ('Should create a new candidate', async () => {
      const [user] = useCandidateMock

      mock.prisma.user.findFirst.mockResolvedValue(user)

      const token = await repository.signInWithEmailAndPasswordCandidate(createUserPayload)

      expect(mock.prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...user
        }
      })
    })
  })
})