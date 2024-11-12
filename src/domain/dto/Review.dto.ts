import { 
  IsOptional, 
  IsString, 
  IsUrl,
  IsUUID, 
  MaxLength, 
  IsNumber, 
  IsPositive, 
  Min, 
  Max
} from "class-validator";

export class CreateReviewDTO {
  @IsString()
  @MaxLength(100)
  jobTitle: string

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsPositive()
  nps: number

  @IsOptional()
  @IsUrl()
  jobLink?: string

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string

  @IsString()
  @MaxLength(50)
  category: string

  @IsUUID()
  company_id: string

  @IsString()
  invite_id: string
}