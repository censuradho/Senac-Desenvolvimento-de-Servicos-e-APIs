import { IsOptional, IsString } from "class-validator";

export class CreateReviewDTO {
  @IsString()
  jobTitle: string

  @IsOptional()
  @IsString()
  description?: string

  @IsString()
  category: string
}