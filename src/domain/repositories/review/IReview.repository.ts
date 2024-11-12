import { CreateReviewDTO } from "@/domain/dto/Review.dto";
import { ReviewEntity } from "@/domain/entities/Review.entity";

export interface IReviewRepository {
  create(candidate_id: string, payload: CreateReviewDTO): Promise<void>
  findByCandidateId(id: string): Promise<ReviewEntity[]>
}