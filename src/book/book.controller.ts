import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createBookDto: CreateBookDto, @UploadedFile() image: any) {
    return this.bookService.create(createBookDto, image);
  }

  @Get("all")
  async searchBooks(@Query('query') query?: string) {
    const books = await this.bookService.search(query);
    return books;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() image: any,
  ) {
    return this.bookService.update(id, updateBookDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
