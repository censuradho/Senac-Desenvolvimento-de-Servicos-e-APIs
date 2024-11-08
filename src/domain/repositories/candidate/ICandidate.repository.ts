import { CandidateEntity } from "@/domain/entities/Candidate.entity";

export interface ICandidateRepository {
  findByUserId (user_id: string): Promise<CandidateEntity | null>
}