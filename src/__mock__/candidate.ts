import { CandidateEntity } from "@/domain/entities/Candidate.entity";
import { randomUUID } from "crypto";

export const candidateMock: CandidateEntity[] = [
  {
    createdAt: new Date(),
    id: randomUUID(),
    updatedAt: new Date(),
    user_id: randomUUID()
  },
  {
    createdAt: new Date(),
    id: randomUUID(),
    updatedAt: new Date(),
    user_id: randomUUID()
  },
  {
    createdAt: new Date(),
    id: randomUUID(),
    updatedAt: new Date(),
    user_id: randomUUID()
  }
]