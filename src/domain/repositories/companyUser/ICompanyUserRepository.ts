import { CompanyUserEntity } from "@/domain/entities/CompanyUser.entity";

export interface ICompanyUserRepository {
  findByUserId (user_id: string): Promise<CompanyUserEntity | null>
}