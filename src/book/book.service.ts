import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model, isValidObjectId } from 'mongoose';
import { Category } from 'src/category/models/category.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    private readonly filesService: FilesService,
  ) {}

  async create(createBookDto: CreateBookDto, image: any) {
    const findBook = await this.bookModel.findOne({
      book_name: createBookDto.book_name,
    });
    if (findBook) throw new BadRequestException('Book is already taken');

    if (!isValidObjectId(createBookDto.category))
      throw new BadRequestException('Category not found');
    const data = await this.categoryModel.findById(createBookDto.category);
    if (!data) throw new NotFoundException('Category not found');
    const book = await this.bookModel.create(createBookDto);
    data.books.push(book);
    (await data.save()).populate('books');
    return book;
  }

  async search(query: string) {
    if (!query) return this.bookModel.find();
    const regexQuery = new RegExp(query, 'i');

    return this.bookModel.find({
      $or: [
        { book_name: { $regex: regexQuery } },
        { author_name: { $regex: regexQuery } },
      ],
    });
  }
  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Book not found');
    const data = await this.bookModel.findById(id);
    if (!data) throw new NotFoundException('Book not found');
    return data;
  }

  async update(id: string, updateBookDto: UpdateBookDto, image: any) {
    if (!isValidObjectId(id)) throw new NotFoundException('Book not found');
    const data = await this.bookModel.findById(id);
    if (!data) throw new NotFoundException('Book not found');

    if (image) {
      await this.filesService.deleteFile(data.photo);
      const photo = await this.filesService.createFile(image);
      updateBookDto.photo = photo;
      return this.bookModel.findByIdAndUpdate(id, updateBookDto);
    } else {
      return this.bookModel.findByIdAndUpdate(id, updateBookDto);
    }
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Book not found');

    const data = await this.bookModel.findById(id);
    if (!data) throw new NotFoundException('Book not found');

    const category = await this.categoryModel.findById(data.category);
    if (!category) throw new NotFoundException('Category not found');

    category.books = category.books.filter((book) => book.toString() !== id);

    await category.save();

    await this.bookModel.findByIdAndDelete(id);

    return 'Book removed successfully';
  }
}
