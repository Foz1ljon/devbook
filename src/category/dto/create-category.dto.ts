import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUppercase } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Nazmlar', description: 'Category name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
