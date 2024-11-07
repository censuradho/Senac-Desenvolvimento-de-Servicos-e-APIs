import { Employer } from "@prisma/client";

export enum EmployerAccessLevel {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

export type EmployerEntity = Employer