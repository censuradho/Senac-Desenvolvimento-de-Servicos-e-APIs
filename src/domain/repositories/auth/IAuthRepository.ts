import { SignInWithEmailAndPAsswordDTO } from '@/domain/dto/Auth.dto';
import { CreateUserDTO, UserRole } from '@/domain/dto/User.dto';
import { UserEntity } from '@/domain/entities/User.entity';
import { UserModel } from '@/domain/models/UserModel';

export interface IAuthRepository {
  signUpWithEmailAndPassword (role: UserRole, payload: CreateUserDTO): Promise<void>
  signInWithEmailAndPasswordEmployer (payload: SignInWithEmailAndPAsswordDTO): Promise<string>
  me(id: string): Promise<UserModel | null>
}