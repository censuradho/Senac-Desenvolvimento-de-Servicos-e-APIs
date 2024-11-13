import { CandidateEntity } from "@/domain/entities/Candidate.entity";
import { CandidateModel } from "@/domain/models/Candidate.model";
import { randomUUID } from "crypto";

export const candidateEntityMock: CandidateEntity = {
  createdAt: new Date(),
  id: randomUUID(),
  updatedAt: new Date(),
  user_id: randomUUID()
}

export const candidateModelMock = new CandidateModel({
  id: randomUUID(),
  user_id: candidateEntityMock.user_id
})

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