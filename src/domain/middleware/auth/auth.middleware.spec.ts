import { describe, expect, it, Mock, vi } from "vitest";
import { jwtMiddleware, jwtMiddlewareEmployer } from ".";
import { nextMock, reqMock, resMock } from "@/__mock__/middleware";
import { ERRORS } from "@/shared/errors";
import { UserRole } from "@/domain/dto/User.dto";
import { Jwt } from "@/shared/jwt";
import { JsonWebTokenError } from "jsonwebtoken";

vi.mock('@/shared/jwt')

describe('AuthMiddlewares', () => {
  describe('jwtMiddleware', () => {
    it ('Should return 401 if auth token is not provide', async () => {

      await jwtMiddleware(reqMock, resMock, nextMock)

      expect(resMock.status).toHaveBeenCalledWith(401)
      expect(resMock.json).toHaveBeenCalledWith({
        message: ERRORS.AUTH.PROVIDE_TOKEN
      })
      expect(nextMock).not.toHaveBeenCalled()
    })

    it ('Should return 401 and do logou if userRole is not UserRole.CANDIDATE', async () => {
      reqMock.cookies = { auth: 'validToken' };

      (Jwt.verifyAccessToken as Mock).mockReturnValueOnce({
        userRole: UserRole.EMPLOYER,
      });

      await jwtMiddleware(reqMock, resMock, nextMock)

      expect(resMock.status).toHaveBeenLastCalledWith(401)
      expect(resMock.json).toHaveBeenLastCalledWith({
        message: ERRORS.AUTH.USER_ROLE_NOT_AUTHORIZED
      })
      expect(nextMock).not.toHaveBeenCalled();
    })
    it ('Should define req.user and call next function if token is valid and UserRole is UserRole.CANDIDATE', async () => {
      reqMock.cookies = { auth: 'validToken' };
      const mockPayload = { userRole: UserRole.CANDIDATE };

      vi.mocked(Jwt.verifyAccessToken).mockReturnValueOnce(mockPayload);

      await jwtMiddleware(reqMock, resMock, nextMock);

      expect(reqMock.user).toEqual(mockPayload);
      expect(nextMock).toHaveBeenCalled();
      expect(resMock.status).not.toHaveBeenCalled();
    })
    it ('Should return 401 and do logout if token is invalid (JsonWebTokenError)', async () => {
      reqMock.cookies = { auth: 'invalidToken' };

      vi.mocked(Jwt.verifyAccessToken).mockImplementationOnce(() => {
        throw new JsonWebTokenError('jwt malformed');
      });

      await jwtMiddleware(reqMock, resMock, nextMock);

      expect(reqMock.log.error).toHaveBeenCalled();
      expect(resMock.sendStatus).toHaveBeenCalledWith(401);
      expect(nextMock).not.toHaveBeenCalled();
    })
    it ('Should return 500 if another error occur with the middleware', async () => {
      reqMock.cookies = { auth: 'invalidToken' };
      vi.mocked(Jwt.verifyAccessToken).mockImplementationOnce(() => {
        throw new Error('unexpected error');
      });
  
      await jwtMiddleware(reqMock, resMock, nextMock);
  
      expect(reqMock.log.error).toHaveBeenCalled();
      expect(resMock.sendStatus).toHaveBeenCalledWith(500);
      expect(nextMock).not.toHaveBeenCalled();
    })
  })
  describe('jwtMiddlewareEmployer', () => {
    it ('Should return 401 if auth token is not provide', async () => {
      reqMock.cookies = {}
      
      await jwtMiddlewareEmployer(reqMock, resMock, nextMock)

      expect(resMock.status).toHaveBeenCalledWith(401)
      expect(resMock.json).toHaveBeenCalledWith({
        message: ERRORS.AUTH.PROVIDE_TOKEN
      })
      expect(nextMock).not.toHaveBeenCalled()
    })

    it ('Should return 401 and do logou if userRole is not UserRole.EMPLOYER', async () => {
      reqMock.cookies = { auth: 'validToken' };

      (Jwt.verifyAccessToken as Mock).mockReturnValueOnce({
        userRole: UserRole.CANDIDATE,
      });

      await jwtMiddlewareEmployer(reqMock, resMock, nextMock)

      expect(resMock.status).toHaveBeenLastCalledWith(401)
      expect(resMock.json).toHaveBeenLastCalledWith({
        message: ERRORS.AUTH.USER_ROLE_NOT_AUTHORIZED
      })
      expect(nextMock).not.toHaveBeenCalled();
    })

    it ('Should return 401 and do logout if token is invalid (JsonWebTokenError)', async () => {
      reqMock.cookies = { auth: 'invalidToken' };

      vi.mocked(Jwt.verifyAccessToken).mockImplementationOnce(() => {
        throw new JsonWebTokenError('jwt malformed');
      });

      await jwtMiddlewareEmployer(reqMock, resMock, nextMock);

      expect(reqMock.log.error).toHaveBeenCalled();
      expect(resMock.sendStatus).toHaveBeenCalledWith(401);
      expect(nextMock).not.toHaveBeenCalled();
    })

    it ('Should define req.user and call next function if token is valid and UserRole is UserRole.CANDIDATE', async () => {
      reqMock.cookies = { auth: 'validToken' };
      const mockPayload = { userRole: UserRole.EMPLOYER };

      vi.mocked(Jwt.verifyAccessToken).mockReturnValueOnce(mockPayload);

      await jwtMiddlewareEmployer(reqMock, resMock, nextMock);

      expect(reqMock.company).toEqual(mockPayload);
      expect(nextMock).toHaveBeenCalled();
      expect(resMock.status).not.toHaveBeenCalled();
    })

    it ('Should return 401 and do logout if token is invalid (JsonWebTokenError)', async () => {
      reqMock.cookies = { auth: 'invalidToken' };

      vi.mocked(Jwt.verifyAccessToken).mockImplementationOnce(() => {
        throw new JsonWebTokenError('jwt malformed');
      });

      await jwtMiddlewareEmployer(reqMock, resMock, nextMock);

      expect(reqMock.company).toBe(undefined)
      expect(reqMock.log.error).toHaveBeenCalled();
      expect(resMock.sendStatus).toHaveBeenCalledWith(401);
      expect(nextMock).not.toHaveBeenCalled();
    })
    it ('Should return 500 if another error occur with the middleware', async () => {
      reqMock.cookies = { auth: 'invalidToken' };
      vi.mocked(Jwt.verifyAccessToken).mockImplementationOnce(() => {
        throw new Error('unexpected error');
      });
  
      await jwtMiddlewareEmployer(reqMock, resMock, nextMock);
  
      expect(reqMock.log.error).toHaveBeenCalled();
      expect(resMock.sendStatus).toHaveBeenCalledWith(500);
      expect(nextMock).not.toHaveBeenCalled();
    })
  })
})