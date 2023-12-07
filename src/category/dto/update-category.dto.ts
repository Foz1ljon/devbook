import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUppercase } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Nazmlar', description: 'Category name' })
  @IsOptional()
  @IsNotEmpty()
  @IsUppercase()
  name?: string;
}
