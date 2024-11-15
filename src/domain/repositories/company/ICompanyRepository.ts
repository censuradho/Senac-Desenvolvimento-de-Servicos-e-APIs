import { CreateCompanyDTO } from "@/domain/dto/Company.dto";
import { Company } from "@prisma/client";

export interface ICompanyRepository {
  create (user_id: string, payload: CreateCompanyDTO): Promise<string>
  findById (id: string): Promise<Company | null>
}