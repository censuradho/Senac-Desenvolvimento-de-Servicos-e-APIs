import { CandidateEntity } from '@/domain/entities/Candidate.entity';
import { ICandidateRepository } from './ICandidate.repository'
import { PrismaClient } from '@prisma/client';
import { HttpException } from '@/domain/models/HttpException';
import { ERRORS } from '@/shared/errors';
import { randomUUID } from 'crypto';
  
export class CandidateRepository implements ICandidateRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  async create (user_id: string) {
    const alreadyRegister = await this.findByUserId(user_id)

    if (alreadyRegister) throw new HttpException(401, ERRORS.CANDIDATE.PROFILE_ALREADY_REGISTER)

    await this.prisma.candidate.create({
      data: {
        id: randomUUID(),
        user_id
      }
    })
  }

  findByUserId(user_id: string): Promise<CandidateEntity | null> {
    return this.prisma.candidate.findFirst({
      where: {
        user_id
      }
    })
  }
}