import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { describe, beforeEach, it, expect } from 'vitest'
import { CandidateRepository } from "./Candidate.repository";
import { candidateMock } from "@/__mock__/candidate";
import { ERRORS } from "@/shared/errors";

describe('Candidaterepository', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })

  const candidate = candidateMock[0];
  
  it('Should create a new Candidate', async () => {
    const repository = new CandidateRepository(ctx.prisma)

    mockCtx.prisma.candidate.findFirst.mockResolvedValue(null);
    mockCtx.prisma.candidate.create.mockResolvedValue(candidate);


    await repository.create(candidate.user_id)

    expect(mockCtx.prisma.candidate.findFirst).toHaveBeenCalledWith({
      where: {
        user_id: candidate.user_id
      }
    })

    expect(mockCtx.prisma.candidate.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        user_id: candidate.user_id
      }
    })
  })

  it ('Should throw an exception when candidate already register', async () => {
    const repository = new CandidateRepository(ctx.prisma)

    mockCtx.prisma.candidate.findFirst.mockResolvedValue(candidate)

    await expect(repository.create(candidate.user_id)).rejects.toThrowError(
      expect.objectContaining({
        status: 401,
        message: ERRORS.CANDIDATE.PROFILE_ALREADY_REGISTER
      })
    );

    expect(mockCtx.prisma.candidate.findFirst).toHaveBeenCalledWith({
      where: {
        user_id: candidate.user_id
      }
    })

    expect(mockCtx.prisma.candidate.create).not.toHaveBeenCalled();
  })

  it ('Should return a candidate if he exist', async () => {
    const repository = new CandidateRepository(ctx.prisma)

    mockCtx.prisma.candidate.findFirst.mockResolvedValue(candidate)

    const hasCandidate = await repository.findByUserId(candidate.user_id)

    expect(hasCandidate).toBeTruthy()

    expect(mockCtx.prisma.candidate.findFirst).toHaveBeenCalledWith({
      where: {
        user_id: candidate.user_id
      }
    })
  })
  it ('Should return null when candidate is not found', async () => {
    const repository = new CandidateRepository(ctx.prisma)

    mockCtx.prisma.candidate.findFirst.mockResolvedValue(null);
    const result = await repository.findByUserId(candidate.user_id);

    expect(result).toBeNull();
    expect(mockCtx.prisma.candidate.findFirst).toHaveBeenCalledWith({
      where: { user_id: candidate.user_id }
    });
  })
})