import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'Sobitjon', description: 'User firstname' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Sobitjonov', description: 'User lastname' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Sobitjon@mail.ru', description: 'User email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  photo?: string;

  @ApiProperty({ example: 'Sobitjon01', description: 'User Username' })
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ example: 'So1!on', description: 'User password' })
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
