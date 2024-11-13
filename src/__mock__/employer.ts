import { EmployerEntity } from "@/domain/entities/Employer.entity";
import { EmployerModel } from "@/domain/models/Employer.model";
import { randomUUID } from "crypto";

export const employerEntityMock: EmployerEntity = {
  access_level: '',
  company_id: '',
  createdAt: new Date(),
  id: randomUUID(),
  updatedAt: new Date(),
  user_id: ''
}

export const employerModelMock = new EmployerModel(employerEntityMock)