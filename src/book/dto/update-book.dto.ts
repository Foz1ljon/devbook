import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  book_name?: string;

  photo?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  author_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  page_count?: number;

  @IsNotEmpty()
  @IsDate()
  published_date?: String;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: string;
}
