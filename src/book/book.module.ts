import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './model/book.model';
import { Category, CategorySchema } from 'src/category/models/category.model';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    FilesModule,
    JwtModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
