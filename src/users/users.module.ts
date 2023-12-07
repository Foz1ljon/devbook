import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_TOKEN_KEY,
      signOptions: { expiresIn: env.JWT_TOKEN_TIME },
    }),
    FilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
