import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateReviewDTO {
  @IsString()
  @MaxLength(100)
  jobTitle: string

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string

  @IsString()
  @MaxLength(50)
  category: string

  @IsUUID()
  company_id: string
}