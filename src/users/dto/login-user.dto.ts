import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'Sobitjon01', description: 'User Username' })
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @ApiProperty({ example: 'So1!on', description: 'User password' })
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
