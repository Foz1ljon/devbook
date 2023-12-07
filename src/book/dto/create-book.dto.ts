import {
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  book_name: string;

  @IsNotEmpty()
  @IsString()
  author_name: string;

  photo: string;

  @IsNotEmpty()
  @IsNumberString()
  page_count: number;

  @IsNotEmpty()
  published_date: String;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  rating: string;

  @IsNotEmpty()
  @IsNumberString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
