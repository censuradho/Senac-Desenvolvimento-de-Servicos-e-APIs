import { CandidateEntity } from '@/domain/entities/Candidate.entity';
import { ICandidateRepository } from './ICandidate.repository'
import { PrismaClient } from '@prisma/client';

export class CandidateRepository implements ICandidateRepository {
  constructor (
    private prisma: PrismaClient
  ) {}

  findByUserId(user_id: string): Promise<CandidateEntity | null> {
    return this.prisma.candidate.findFirst({
      where: {
        user_id
      }
    })
  }
}