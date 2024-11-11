import { CreateUserDTO, UserRole } from '@/domain/dto/User.dto';
import { UserEntity } from '@/domain/entities/User.entity';

export interface IUserRepository {
  create (role: UserRole, payload: CreateUserDTO): Promise<string>
  findByEmail (email: string): Promise<UserEntity | null>
  findById (id: string): Promise<UserEntity | null>
}