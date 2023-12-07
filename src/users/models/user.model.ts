import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User {
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;

  @Prop({ default: 'user.jpg' })
  photo: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  is_admin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
