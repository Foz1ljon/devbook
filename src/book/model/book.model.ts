import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/category/models/category.model';

@Schema({ versionKey: false })
export class Book {
  @Prop()
  book_name: string;
  @Prop({ default: 'https://shorturl.at/kmY13' })
  photo: string;
  @Prop()
  author_name: string;
  @Prop()
  page_count: number;
  @Prop()
  published_date: String;
  @Prop()
  type: string;
  @Prop()
  description: string;
  @Prop()
  rating: string;
  @Prop()
  comment: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
