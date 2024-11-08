import { compare } from 'bcrypt';

import { SignInWithEmailAndPAsswordDTO } from '@/domain/dto/Auth.dto';
import { CreateUserDTO } from '@/domain/dto/User.dto';
import { UserEntity } from '@/domain/entities/User.entity';
import { HttpException } from '@/domain/models/HttpException';
import { JWTPayloadEmployer } from '@/domain/models/JWTPayload';
import { UserEmployerModel, UserModel } from '@/domain/models/UserModel';
import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { UserRole } from '@/domain/dto/User.dto';
import { EmployerRepository } from '@/domain/repositories/employer/EmployerRepository';

import { ERRORS } from '@/shared/errors';
import { Jwt } from '@/shared/jwt';

import { IAuthRepository } from './IAuthRepository';
import { EmployerModel } from '@/domain/models/Employer.model';

export class AuthRepository implements IAuthRepository {
  constructor (
    private userRepository: UserRepository,
    private employerRepository: EmployerRepository
  ) {}

  private async signInWithEmailAndPassword (payload: SignInWithEmailAndPAsswordDTO) {
    const user = await this.userRepository.findByEmail(payload.email)

    if (!user) throw new HttpException(404, ERRORS.USER.NOT_FOUND)
    
    const isPasswordMatched = await compare(payload.password, user.password)

    if (!isPasswordMatched) throw new HttpException(401, ERRORS.USER.INCORRECT_PASSWORD_OR_EMAIL)

    return user
  }

  async signInWithEmailAndPasswordEmployer (payload: SignInWithEmailAndPAsswordDTO) {
    const user = await this.signInWithEmailAndPassword(payload)

    return this.generateJWTEmployer(user)
  }

  async generateJWTEmployer (user: UserEntity) {
    const companyUser = await this.employerRepository.findByUserId(user.id)

    const jwtPayload = new JWTPayloadEmployer(
      user.id,
      user.role as UserRole,
      companyUser?.company_id
    )

    const token = Jwt.generateAccessToken(
      jwtPayload
    )

    return token
  }

  async signUpWithEmailAndPassword (role: UserRole, payload: CreateUserDTO) {
    await this.userRepository.create(role, payload)
  }

  async me (user_id: string) {
    const user=  await this.userRepository.findById(user_id)

    if (!user) return null

    return new UserModel(user)
  }

  async meEmployer (user_id: string) {
    const user = await this.me(user_id)

    if (!user) return null

    const employerEntity = await this.employerRepository.findByUserId(user_id)

    return new UserEmployerModel({
      ...user,
      ...(employerEntity && ({
        employer: new EmployerModel(employerEntity)
      }))
    })
  }
}