import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UploadedFile,
  UseInterceptors,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  @UseInterceptors(FileInterceptor('image'))
  register(
    @Body() RegisterUserDto: RegisterUserDto,
    @UploadedFile() image: any,
  ) {
    return this.usersService.register(RegisterUserDto, image);
  }
  @HttpCode(200)
  @Post('auth/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }
  @Get('users')
  findAll(@Query('query') query: string) {
    return this.usersService.search(query);
  }

  @Get(':filename')
  async getPhoto(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const photoPath = this.usersService.getPhotoPath(filename);
      res.sendFile(photoPath);
    } catch (error) {
      res.status(404).send('Photo not found');
    }
  }
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('profile/:id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: any,
  ) {
    return this.usersService.update(id, updateUserDto, image);
  }

  @Delete('profile/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
