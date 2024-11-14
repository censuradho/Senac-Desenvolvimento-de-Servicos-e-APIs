import { NextFunction, Request, Response } from "express"
import { beforeEach, vi } from "vitest"

export const reqMock = { 
  cookies: {},
  log: { error: vi.fn() },
} as unknown as Request 

export const resMock = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn(),
  sendStatus: vi.fn(),
  clearCookie: vi.fn(),
} as unknown as Response

export const nextMock = vi.fn() as NextFunction

beforeEach(() => {
  vi.clearAllMocks()
})