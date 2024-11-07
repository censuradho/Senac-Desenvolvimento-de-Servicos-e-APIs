import { Company } from "@prisma/client";

export enum CompanyType {
  COMPANY_PUBLIC = 'COMPANY_PUBLIC',
  COMPANY_PRIVATE = 'COMPANY_PRIVATE',
  CONTRACT = 'CONTRACT',
  FRANCHISE = 'FRANCHISE', // Franquia
  SUBSIDIARY_SEGMENT = 'SUBSIDIARY_SEGMENT', // subsidiária ou segmento de negócio
  HOSPITAL = 'HOSPITAL', // subsidiária ou segmento de negócio
  PRIVATE_PRACTICE = 'PRIVATE_PRACTICE', // Escritório/Clínica particular
  SCHOOL = 'SCHOOL',
  COLLEGE = 'COLLEGE', // faculdade
  GOVERNMENT = 'GOVERNMENT', // Governo
  NON_PROFIT = 'NON_PROFIT', // Organização sem fins lucrativos
  SELF_EMPLOYED = 'SELF_EMPLOYED', // Autônomo
  OTHER = 'OTHER', // Autônomo
}

export type CompanyEntity = Company