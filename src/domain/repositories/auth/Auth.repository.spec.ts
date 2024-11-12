import { Context, createMockContext, MockContext } from "@/__test__/setup";
import { beforeEach, describe, it } from "vitest";

describe('AuthRepository', () => {
  let mockCtx: MockContext
  let ctx: Context

  beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
  })
})