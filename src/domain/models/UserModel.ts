import { UserEntity } from '@/domain/entities/User.entity';

type UserModelSchema = Pick<UserEntity,
  'email'
  | 'firstName'
  | 'id'
  | 'lastName'
  | 'role'
>

export class UserModel implements UserModelSchema {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;

  constructor (data: UserModelSchema) {
    Object.assign(this, {
      email: data.email,
      firstName: data.firstName,
      id: data.id,
      lastName: data.lastName,
      role: data.role,
    })
  }

  static entityToModel (entity: UserEntity): UserModelSchema {
    return {
      email: entity.email,
      firstName: entity.firstName,
      id: entity.id,
      lastName: entity.lastName,
      role: entity.role,
    }
  }
}