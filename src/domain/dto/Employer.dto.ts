import { IsString } from "class-validator"
 
export class CreateEmployerDTO {
  @IsString()
  user_id: string
  @IsString()
  company_id: string
  @IsString()
  access_level: string
}