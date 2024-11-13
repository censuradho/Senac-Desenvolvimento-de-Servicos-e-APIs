import { CreateCompanyDTO } from "@/domain/dto/Company.dto";
import { CompanyEntity } from "@/domain/entities/Company.entity";

export const createCompanyPayloadMock: CreateCompanyDTO = {
	name: "Vortigo",
	cnpj: "83.629.204/0001-13",
	site: "https://meusite.com",
	type: "COMPANY_PUBLIC",
	description: "asdasdasd"
}

export const companyEntityMock: CompanyEntity = {
	name: "Vortigo",
	cnpj: "83.629.204/0001-13",
	site: "https://meusite.com",
	type: "COMPANY_PUBLIC",
	description: "asdasdasd",
	avatar: '',
	createdAt: new Date(),
	updatedAt: new Date(),
	id: 'meu_id',
}