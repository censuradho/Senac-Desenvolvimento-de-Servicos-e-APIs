import { IsEnum, IsOptional, IsString, IsUrl, Validate } from "class-validator"

import { CompanyType } from "@/domain/entities/Company.entity"

import { IsCNPJ } from "./IsCNPJ"

export class CreateCompanyDTO {
  @IsString()
  name: string

  @IsString()
  @Validate(IsCNPJ)
  cnpj: string

  @IsOptional()
  @IsString()
  @IsUrl()
  site?: string

  @IsString()
  @IsEnum(CompanyType)
  type: string

  @IsOptional()
  @IsString()
  description?: string
}