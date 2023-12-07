import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { Model, isValidObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { FilesService } from 'src/files/files.service';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtservice: JwtService,
    private readonly filesService: FilesService,
  ) {}

  getToken(data: any) {
    const payload = {
      id: data._id,
      is_admin: data.is_admin,
    };
    const token = this.jwtservice.sign(payload);
    const user = {
      _id: data._id,
      firstName: data.firstName,
      lastName: data.firstName,
      photo: data.photo,
      email: data.email,
      username: data.username,
      is_admin: data.is_admin,
      token: token,
    };

    return user;
  }

  async register(registerUserDto: RegisterUserDto, image: any) {
    const findUser = await this.userModel.findOne({
      username: registerUserDto.username,
    });

    if (findUser) throw new BadRequestException('User already exists');

    if (!image) {
      registerUserDto.password = await bcrypt.hash(
        registerUserDto.password,
        10,
      );
      const data = await this.userModel.create(registerUserDto);

      return this.getToken(data);
    } else {
      const photo = await this.filesService.createFile(image);
      registerUserDto.photo = photo;
      registerUserDto.password = await bcrypt.hash(
        registerUserDto.password,
        10,
      );
      const data = await this.userModel.create({
        ...registerUserDto,
      });

      return this.getToken(data);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const findUser = await this.userModel.findOne({
      username: loginUserDto.username,
    });

    if (!findUser) throw new NotFoundException('Invalid username or password');

    const isMatch = await bcrypt.compare(
      loginUserDto.password,
      findUser.password,
    );

    if (!isMatch) throw new NotFoundException('Invalid username or password');

    return this.getToken(findUser);
  }

  getPhotoPath(filename: string): string {
    const photoPath = join(__dirname, '..', 'tmp', filename);

    return photoPath;
  }

  async search(query: string) {
    if (!query) return this.userModel.find();
    const regexQuery = new RegExp(query, 'i');

    return this.userModel.find({
      $or: [
        { username: { $regex: regexQuery } },
        { firstName: { $regex: regexQuery } },
      ],
    });
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('User not found');
    const data = await this.userModel.findById(id);
    if (!data) throw new NotFoundException('User not found');

    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto, image: any) {
    if (!isValidObjectId(id)) throw new NotFoundException('User not found');
    const data = await this.userModel.findById(id);
    if (!data) throw new NotFoundException('User not found');
    if (image) {
      await this.filesService.deleteFile(data.photo);
      const photo = await this.filesService.createFile(image);
      updateUserDto.photo = photo;
      return this.userModel.findByIdAndUpdate(id, updateUserDto);
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('User not found');
    const data = await this.userModel.findById(id);
    if (!data) throw new NotFoundException('User not found');

    return this.userModel.findByIdAndDelete(id);
  }
}
