import { UserEntity } from '@/domain/entities/User.entity';

type UserModelSchema = Pick<UserEntity,
  'email'
  | 'firstName'
  | 'id'
  | 'lastName'
>

export class UserModel implements UserModelSchema {
  email: string;
  firstName: string;
  id: string;
  lastName: string;

  constructor (data: UserModelSchema) {
    Object.assign(this, {
      email: data.email,
      firstName: data.firstName,
      id: data.id,
      lastName: data.lastName,
    })
  }

  static entityToModel (entity: UserEntity): UserModelSchema {
    return {
      email: entity.email,
      firstName: entity.firstName,
      id: entity.id,
      lastName: entity.lastName,
    }
  }
}