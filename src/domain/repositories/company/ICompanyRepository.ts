import { CreateCompanyDTO } from "@/domain/dto/Company.dto";

export interface ICompanyRepository {
  create (user_id: string, payload: CreateCompanyDTO): Promise<void>
}