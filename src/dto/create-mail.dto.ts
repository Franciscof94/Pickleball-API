import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMailtDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
