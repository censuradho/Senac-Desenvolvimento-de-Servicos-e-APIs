import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  email: string

  @IsString()
  password: string
}
