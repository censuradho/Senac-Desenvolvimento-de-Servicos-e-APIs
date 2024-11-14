import { CreateInviteToReviewDTO } from '@/domain/dto/InviteToReview.dto';
import { InviteToReviewEntity } from '@/domain/entities/InviteToReview.entity';

export const inviteToReviewEntityMock: InviteToReviewEntity = {
  answered: false,
  createdAt: new Date(),
  employer_id: 'employer_id',
  id: 'id',
  updatedAt: new Date(),
  validDays: 10
}

export const createInviteToReviewPayloadMock: CreateInviteToReviewDTO = {
  validDays: 10
}