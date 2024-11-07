import { EmployerEntity } from "@/domain/entities/Employer.entity"

export class EmployerModel {
  access_level: string

  constructor(payload: EmployerEntity) {
      this.access_level = payload.access_level
  }
}