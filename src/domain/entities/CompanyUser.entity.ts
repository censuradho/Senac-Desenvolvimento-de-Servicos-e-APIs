import { CompanyUser } from "@prisma/client";

export enum CompanyUserAccessLevel {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
}

export type CompanyUserEntity = CompanyUser