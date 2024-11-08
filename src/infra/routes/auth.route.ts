import { Router } from 'express';

import { jwtMiddleware, jwtMiddlewareEmployer } from '@/domain/middleware/auth.middleware';
import { signInWithEmailAndPasswordRequestBodyValidation } from '@/domain/middleware/auth.validations';
import { createUserValidation } from '@/domain/middleware/user.validations';
import { AuthRepository } from '@/domain/repositories/auth/AuthRepository';
import { UserRepository } from '@/domain/repositories/user/UserRepository';

import { CandidateRepository } from '@/domain/repositories/candidate/Candidate.repository';
import { EmployerRepository } from '@/domain/repositories/employer/EmployerRepository';
import { AuthController } from '@/infra/controllers/auth.controller';
import { prisma } from '@/shared/PrismaClient';

const authRoute = Router()

const userRepository = new UserRepository(prisma)
const employerRepository = new EmployerRepository(prisma)
const candidateRepository = new CandidateRepository(prisma)

const repository = new AuthRepository(
  userRepository, 
  employerRepository,
  candidateRepository,
)

const controller = new AuthController(repository)

authRoute.post(
  '/auth/login/employer', 
  signInWithEmailAndPasswordRequestBodyValidation, 
  controller.signInWithEmailAndPasswordEmployer.bind(controller)
)

authRoute.get(
  '/auth/me/employer',
  jwtMiddlewareEmployer, 
  controller.meEmployer.bind(controller)
)

authRoute.post(
  '/auth/register/employer', 
  createUserValidation, 
  controller.signUpWithEmailAndPAsswordEmployer.bind(controller)
)


authRoute.post(
  '/auth/register/candidate', 
  createUserValidation, 
  controller.signUpWithEmailAndPAsswordCandidate.bind(controller)
)

authRoute.get(
  '/auth/me/candidate',
  jwtMiddleware, 
  controller.meEmployer.bind(controller)
)

authRoute.post(
  '/auth/login/candidate', 
  signInWithEmailAndPasswordRequestBodyValidation, 
  controller.signInWithEmailAndPasswordCandidate.bind(controller)
)

authRoute.get(
  '/auth/sign-out', 
  controller.signOut.bind(controller)
)

export {
  authRoute
};

