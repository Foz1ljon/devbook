import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Sobitjon', description: 'User firstname' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Sobitjonov', description: 'User lastname' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'Sobitjonov', description: 'User lastname' })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  photo?: string;

  @ApiProperty({ example: 'Sobitjon@mail.ru', description: 'User email' })
  @IsOptional()
  @IsNotEmpty()
  @IsNotEmpty()
  email?: string;

  @ApiProperty({ example: 'Sobitjon01', description: 'User Username' })
  @IsOptional()
  @IsNotEmpty()
  @IsAlphanumeric()
  username?: string;

  @ApiProperty({ example: 'So1!on', description: 'User password' })
  @IsOptional()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 6 })
  password?: string;
}
