import { IsString } from 'class-validator';

export class SignInWithEmailAndPAsswordDTO {
  @IsString()
  email: string

  @IsString()
  password: string
}