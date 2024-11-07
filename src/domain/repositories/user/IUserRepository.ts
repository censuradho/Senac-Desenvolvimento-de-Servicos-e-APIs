import { CreateUserDTO } from '@/domain/dto/User.dto';
import { UserEntity } from '@/domain/entities/User.entity';

export interface IUserRepository {
  create (payload: CreateUserDTO): Promise<void>
  findByEmail (email: string): Promise<UserEntity | null>
  findById (id: string): Promise<UserEntity | null>
}