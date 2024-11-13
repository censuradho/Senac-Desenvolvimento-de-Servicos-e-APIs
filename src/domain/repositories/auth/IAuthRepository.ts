import { SignInWithEmailAndPAsswordDTO } from '@/domain/dto/Auth.dto';
import { CreateUserDTO, UserRole } from '@/domain/dto/User.dto';

export interface IAuthRepository {
  signUpWithEmailAndPassword (role: UserRole, payload: CreateUserDTO): Promise<void>
  signInWithEmailAndPasswordEmployer (payload: SignInWithEmailAndPAsswordDTO): Promise<string>
}