import { CreateInviteToReviewDTO } from "@/domain/dto/InviteToReview.dto";
import { InviteToReviewEntity } from "@/domain/entities/InviteToReview.entity";

export interface IInviteToReviewRepository {
  findById (id: string): Promise<InviteToReviewEntity | null>
  create (employer_id: string, payload: CreateInviteToReviewDTO): Promise<void>
  markAsAnswered(id: string, reviewId: string): Promise<void>
  validate(id: string): Promise<boolean>
}