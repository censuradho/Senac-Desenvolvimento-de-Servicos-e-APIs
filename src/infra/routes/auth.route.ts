import { Router } from 'express';

import { jwtMiddleware } from '@/domain/middleware/auth.middleware';
import { signInWithEmailAndPasswordRequestBodyValidation } from '@/domain/middleware/auth.validations';
import { createUserValidation } from '@/domain/middleware/user.validations';
import { AuthRepository } from '@/domain/repositories/auth/AuthRepository';
import { UserRepository } from '@/domain/repositories/user/UserRepository';

import { AuthController } from '@/infra/controllers/auth.controller';
import { prisma } from '@/shared/PrismaClient';

const authRoute = Router()

const userRepository = new UserRepository(prisma)
const repository = new AuthRepository(userRepository)
const controller = new AuthController(repository)

authRoute.post(
  '/auth/login', 
  signInWithEmailAndPasswordRequestBodyValidation, 
  controller.signInWithEmailAndPassword.bind(controller)
)

authRoute.get(
  '/auth/me',
  jwtMiddleware, 
  controller.me.bind(controller)
)

authRoute.post(
  '/auth/register', 
  createUserValidation, 
  controller.signUpWithEmailAndPAssword.bind(controller)
)


authRoute.get(
  '/auth/sign-out', 
  controller.signOut.bind(controller)
)

export {
  authRoute
};
