import { EmployerEntity } from "@/domain/entities/Employer.entity";

export interface IEmployerRepository {
  findByUserId (user_id: string): Promise<EmployerEntity | null>
}