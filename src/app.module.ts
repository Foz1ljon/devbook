import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(env.DB_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tmp'),
      serveRoot: '/tmp',
    }),

    UsersModule,
    CategoryModule,
    BookModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
