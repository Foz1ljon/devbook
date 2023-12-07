import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './models/category.model';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (data) throw new BadRequestException('Already exists category');

    return this.categoryModel.create(createCategoryDto);
  }

  async searchByName(query: string) {
    if (!query) return this.categoryModel.find().populate('books');
    const regexQuery = new RegExp(query, 'i');

    const categories = await this.categoryModel
      .find({
        name: regexQuery,
      })
      .populate('books');

    return categories;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Category not found');
    const data = await this.categoryModel.findById(id);

    if (!data) throw new NotFoundException('Category not found');

    return data.populate('books');
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!isValidObjectId(id)) throw new NotFoundException('Id not found');
    const data = await this.categoryModel.findById(id);
    if (!data) throw new NotFoundException('Id not found');
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Id not found');
    const data = await this.categoryModel.findById(id);
    if (!data) throw new NotFoundException('Id not found');

    return this.categoryModel.findByIdAndDelete(id);
  }
}
