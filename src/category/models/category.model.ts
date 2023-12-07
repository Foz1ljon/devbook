import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Book } from 'src/book/model/book.model';

@Schema({ versionKey: false })
export class Category {
  @ApiProperty({ example: 'Nazmlar', description: 'Category name' })
  @Prop()
  name: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
  books: Book[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
