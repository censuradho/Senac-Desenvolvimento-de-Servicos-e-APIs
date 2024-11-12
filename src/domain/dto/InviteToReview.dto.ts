import { IsNumber, IsPositive, Max } from "class-validator";

export class CreateInviteToReviewDTO {
  @IsNumber()
  @IsPositive()
  @Max(365) 
  /** In days */
  validDays: number
}