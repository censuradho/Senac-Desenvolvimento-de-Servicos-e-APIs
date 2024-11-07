import { Router } from 'express';

import { jwtMiddleware } from '@/domain/middleware/auth.middleware';
import { signInWithEmailAndPasswordRequestBodyValidation } from '@/domain/middleware/auth.validations';
import { createUserValidation } from '@/domain/middleware/user.validations';
import { AuthRepository } from '@/domain/repositories/auth/AuthRepository';
import { UserRepository } from '@/domain/repositories/user/UserRepository';

import { AuthController } from '@/infra/controllers/auth.controller';
import { prisma } from '@/shared/PrismaClient';
import { CompanyUserRepository } from '@/domain/repositories/companyUser/CompanyUserRepository';

const authRoute = Router()

const userRepository = new UserRepository(prisma)
const companyUserRepository = new CompanyUserRepository(prisma)

const repository = new AuthRepository(
  userRepository, 
  companyUserRepository
)

const controller = new AuthController(repository)

authRoute.post(
  '/auth/login/employer', 
  signInWithEmailAndPasswordRequestBodyValidation, 
  controller.signInWithEmailAndPasswordEmployer.bind(controller)
)

authRoute.get(
  '/auth/me/employer',
  jwtMiddleware, 
  controller.me.bind(controller)
)

authRoute.post(
  '/auth/register/employer', 
  createUserValidation, 
  controller.signUpWithEmailAndPAsswordEmployer.bind(controller)
)


authRoute.get(
  '/auth/sign-out', 
  controller.signOut.bind(controller)
)

export {
  authRoute
};
