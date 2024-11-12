import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { beforeEach, describe } from "vitest";

describe('UserRepository', () => {
  let mock: MockContext
  let ctx: Context

  beforeEach(() => {
    mock = createMockContext()
    ctx = mock as unknown as Context
  })
})