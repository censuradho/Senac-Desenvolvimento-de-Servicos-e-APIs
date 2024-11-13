import { candidateEntityMock } from "@/__mock__/candidate";
import { employerEntityMock } from "@/__mock__/employer";
import { createUserPayload, userCandidateEntityMock, userEmployerEntityMock, userLoginPayload } from "@/__mock__/user";
import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { UserRole } from "@/domain/dto/User.dto";
import { HttpException } from "@/domain/models/HttpException";
import { ERRORS } from "@/shared/errors";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CandidateRepository } from "../candidate/Candidate.repository";
import { EmployerRepository } from "../employer/EmployerRepository";
import { UserRepository } from "../user/UserRepository";
import { AuthRepository } from "./AuthRepository";

describe('AuthRepository', () => {
  let mock: MockContext
  let ctx: Context
  let repository: AuthRepository
  let userRepository: UserRepository
  let candidateRepository: CandidateRepository
  let employerRepository: EmployerRepository

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context
    userRepository = new UserRepository(ctx.prisma)
    candidateRepository = new CandidateRepository(ctx.prisma)
    employerRepository = new EmployerRepository(ctx.prisma)

    repository = new AuthRepository(
      userRepository,
      employerRepository,
      candidateRepository,
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
      const user = userCandidateEntityMock

      mock.prisma.user.findFirst.mockResolvedValue({
        ...user,
        password: 'senha_salva_sem_hash'
      })

      const request = repository.signInWithEmailAndPasswordCandidate(userLoginPayload)
    
      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          message: ERRORS.USER.INCORRECT_PASSWORD_OR_EMAIL,
          status: 401
        })
      )
    })

    it ('Should sign in if pass right credentials', async () => {
      const user = userCandidateEntityMock

      mock.prisma.user.findFirst.mockResolvedValue(user)

      const token = await repository.signInWithEmailAndPasswordCandidate(userLoginPayload)

      expect(token).toBeTruthy()
    })
  })
  describe('signInWithEmailAndPasswordEmployer', async () => {
    it ('Should throw an exception if user was not founded by email', async () => {
      mock.prisma.user.findFirst.mockResolvedValue(null)

      const request = repository.signInWithEmailAndPasswordEmployer(
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
      const user = userCandidateEntityMock

      mock.prisma.user.findFirst.mockResolvedValue({
        ...user,
        password: 'senha_salva_sem_hash'
      })

      const request = repository.signInWithEmailAndPasswordEmployer(userLoginPayload)
    
      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          message: ERRORS.USER.INCORRECT_PASSWORD_OR_EMAIL,
          status: 401
        })
      )
    })

    it ('Should sign in if pass right credentials', async () => {
      const user = userCandidateEntityMock

      mock.prisma.user.findFirst.mockResolvedValue(user)

      const token = await repository.signInWithEmailAndPasswordEmployer(userLoginPayload)
 

      expect(token).toBeTruthy()
    })

  })

  it ('signUpWithEmailAndPassword', async () => {
    const methodMock = vi.spyOn(
      repository, 
      'signUpWithEmailAndPassword'
    )

    await repository.signUpWithEmailAndPassword(UserRole.CANDIDATE, createUserPayload)

    expect(methodMock).toHaveBeenCalled();
  })

  describe('signUpWithEmailAndPasswordCandidate', () => {
    it ('Should create a new user and register a new candidate, signing user to candidate', async () => {
      const userMethodMock = vi.spyOn(
        userRepository, 
        'create'
      )

      const candidateRepositoryMock = vi.spyOn(
        candidateRepository, 
        'create'
      )

      await repository.signUpWithEmailAndPasswordCandidate(createUserPayload)

      expect(userMethodMock).toHaveBeenCalled();
      expect(candidateRepositoryMock).toHaveBeenCalled();
    })
  })

  describe('meEmployer', () => {
    it ('Should return employer if found by user_id', async () => {
      const user = userEmployerEntityMock

      mock.prisma.user.findFirst.mockResolvedValue(user)
      mock.prisma.employer.findFirst.mockResolvedValue({
        ...employerEntityMock,
        user_id: user.id
      })

      const employerRepositoryMock = vi.spyOn(
        employerRepository, 
        'findByUserId'
      )

      const userMethodMock = vi.spyOn(
        userRepository, 
        'findById'
      )

      const employerModel = await repository.meEmployer(user.id)

      expect(userMethodMock).toBeCalled()
      expect(employerRepositoryMock).toBeCalled()
      expect(employerModel).toBeTruthy()
    })

    it ('Should return null if employer not found by user_id', async () => {
      mock.prisma.user.findFirst.mockResolvedValue(null)

      const employerModel = await repository.meEmployer(userEmployerEntityMock.id)

      expect(employerModel).toBe(null)
    })
  })

  describe('meCandidate', () => {
    it ('Should return candidate if found by user_id', async () => {
      mock.prisma.user.findFirst.mockResolvedValue(userCandidateEntityMock)
      mock.prisma.candidate.findFirst.mockResolvedValue(candidateEntityMock)


      const userMethodMock = vi.spyOn(
        userRepository, 
        'findById'
      )

      const candidateMethodMock = vi.spyOn(
        candidateRepository, 
        'findByUserId'
      )

      const candidateModel = await repository.meCandidate(userCandidateEntityMock.id)

      expect(userMethodMock).toBeCalled()
      expect(candidateMethodMock).toBeCalled()
      expect(candidateModel).toBeTruthy()
    })
  })
})