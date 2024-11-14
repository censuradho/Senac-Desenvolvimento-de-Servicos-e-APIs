import { CreateReviewDTO } from "@/domain/dto/Review.dto";
import { ReviewEntity } from "@/domain/entities/Review.entity";

export const createReviewDTOMock: CreateReviewDTO = {
  category: '',
  company_id: 'company_id',
  invite_id: 'invite_id',
  jobTitle: 'jobTitle', 
  description: 'description', 
  jobLink: 'jobLink',
  nps: 10
}

export const reviewEntityMock: ReviewEntity = {
  ...createReviewDTOMock,
  candidate_id: 'candidate_id',
  createdAt: new Date(),
  id: 'id',
  description: 'description', 
  jobLink: 'jobLink',
  updatedAt: new Date()
}