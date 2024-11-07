import { UserRepository } from '@/domain/repositories/user/UserRepository';
import { IAuthRepository } from './IAuthRepository';
import { CreateUserDTO } from '@/domain/dto/User.dto';
import { SignInWithEmailAndPAsswordDTO } from '@/domain/dto/Auth.dto';
import { HttpException } from '@/domain/models/HttpException';
import { compare } from 'bcrypt'
import { Jwt } from '@/shared/jwt';
import { JWTPayload } from '@/domain/models/JWTPayload';
import { ERRORS } from '@/shared/errors';
import { UserModel } from '@/domain/models/UserModel';

export class AuthRepository implements IAuthRepository {
  constructor (
    private userRepository: UserRepository
  ) {}

  async signUpWithEmailAndPassword (payload: CreateUserDTO) {
    await this.userRepository.create(payload)
  }

  async signInWithEmailAndPassword (payload: SignInWithEmailAndPAsswordDTO) {
    const user = await this.userRepository.findByEmail(payload.email)

    if (!user) throw new HttpException(404, ERRORS.USER.NOT_FOUND)

    const isPasswordMatched = await compare(payload.password, user.password)

    if (!isPasswordMatched) throw new HttpException(401, ERRORS.USER.INCORRECT_PASSWORD_OR_EMAIL)

    const jwtPayload = new JWTPayload(user.id)

    const token = Jwt.generateAccessToken(
      jwtPayload
    )

    return token
  }

  async me (id: string) {
    const user=  await this.userRepository.findById(id)

    if (!user) return null

    return new UserModel(user)
  }
}