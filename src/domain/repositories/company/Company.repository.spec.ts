import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CompanyRepository } from "./CompanyRepository";
import { EmployerRepository } from "../employer/EmployerRepository";
import { FileUploadService } from "@/domain/service/fileUpload/FileUpload.service";
import { companyEntityMock, createCompanyPayloadMock } from "@/__mock__/company";
import { ERRORS } from "@/shared/errors";
import { HttpException } from "@/domain/models/HttpException";
import { employerEntityMock } from "@/__mock__/employer";
import { fileMock } from "@/__mock__/file";

describe('CompanyRepository', () => {
  let mock: MockContext
  let ctx: Context
  let repository: CompanyRepository
  let employerRepository: EmployerRepository
  let fileUploadService: FileUploadService

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context
    employerRepository = new EmployerRepository(ctx.prisma)
    fileUploadService = new FileUploadService()

    repository = new CompanyRepository(
      ctx.prisma,
      employerRepository,
      fileUploadService
    )
  })

  describe('create', () => {
    it ('Should throw an error when try to create a company if there is already an employer associated with the provide user_id', async () => {
      mock.prisma.employer.findFirst.mockResolvedValue(employerEntityMock)

      const request = repository
        .create('id_aleatório', createCompanyPayloadMock)

      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          status: 400,
          message: ERRORS.EMPLOYER.ALREADY_HAVE_COMPANY_RELATED
        })
      )
    })

    it ('Should throw an error when try to create a company if there is already an company associated with the provide CNPJ', async () => {
      mock.prisma.company.findFirst.mockResolvedValue(companyEntityMock)

      const request = repository
        .create('id_aleatório', createCompanyPayloadMock)
    
      expect(request).rejects.toBeInstanceOf(HttpException)
      expect(request).rejects.toThrowError(
        expect.objectContaining({
          status: 400,
          message: ERRORS.COMPANY.CNPJ_ALREADY_EXIST
        })
      )
    })

    it ('Should create a company', async () => {
      mock.prisma.company.findFirst.mockResolvedValue(null)
      mock.prisma.employer.findFirst.mockResolvedValue(null)

      const employerMethodMock = vi.spyOn(
        employerRepository, 
        'findByUserId'
      )

      const companyId = await repository.create('user_id', createCompanyPayloadMock)


      expect(employerMethodMock).toBeCalled()
      expect(mock.prisma.company.findFirst).toBeCalledWith({
        where: {
          cnpj: createCompanyPayloadMock.cnpj
        }
      })
      expect(companyId).toBeTruthy()
    })
  })

  describe('findById', () => {
    it ('Should return company entity by id', async () => {
      mock.prisma.company.findFirst.mockResolvedValue(companyEntityMock)

      const entity = await repository.findById(companyEntityMock.id)

      expect(mock.prisma.company.findFirst).toBeCalledWith({
        where: {
          id: companyEntityMock.id
        }
      })
      expect(entity).toStrictEqual(companyEntityMock)
    })
  })

  describe('avatarUpload', () => {

    it ('Should update company avatar', async () => {
      const employerMethodMock = vi.spyOn(
        fileUploadService, 
        'removeFile'
      )

      await repository.avatarUpload('company_id', fileMock)

      expect(employerMethodMock).not.toHaveBeenCalled()
    })

    it ('Should update company avatar and remove previous file if exist', async () => {
      const employerMethodMock = vi.spyOn(
        fileUploadService, 
        'removeFile'
      )

      mock.prisma.company.findFirst.mockResolvedValue({
        ...companyEntityMock,
        avatar: fileMock.path
      })

      await repository.avatarUpload(companyEntityMock.id, fileMock)

      expect(employerMethodMock).toHaveBeenCalledWith(fileMock.path)
      expect(mock.prisma.company.update).toHaveBeenCalledWith({
        where: {
          id: companyEntityMock.id
        },
        data: {
          avatar: fileMock.path
        }
      })
    })
  })
})