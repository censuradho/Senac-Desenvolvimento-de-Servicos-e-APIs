import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { beforeEach, describe, expect, it } from "vitest";
import { EmployerRepository } from "./EmployerRepository";

describe('EmployerRepository', () => {
  let mock: MockContext
  let ctx: Context
  let repository: EmployerRepository

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context
    repository = new EmployerRepository(ctx.prisma)
  })


  describe('.findByUserId', () => {
    it ('Should return employer by user_id', async () => {
      const userId = 'userId'
      
      await repository.findByUserId(userId)

      expect(ctx.prisma.employer.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId
        }
      })
    })
  })
  describe('.findByUserIdAndCompanyId',  () => {
    it ('Should return employer by user_id & company_id', async () => {
      const userId = 'userId'
      const companyId = 'companyId'

      await repository.findByUserIdAndCompanyId(userId, companyId)

      expect(ctx.prisma.employer.findFirst).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          company_id: companyId
        }
      })
    })
  })
})