import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindByIdQuery } from '../../common/dto/query/find-by-id-query.dto';
import * as aqp from 'api-query-params';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/users.model';
import { DatabaseErrorDto } from 'src/common/dto/errors/database-error.dto';
import { SignupUserDto } from '../dtos/sign-up-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    readonly userModel: Model<User>,
  ) {}

  async findUserById(userId: string, query?: FindByIdQuery): Promise<User> {
    const { projection } = aqp(query);

    const user = await this.userModel
      .findById(userId)
      .select(projection)
      .exec();

    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    return user.toObject();
  }

  async findUserByIdBBVA(
    userIdBBVA: string,
    query?: FindByIdQuery,
  ): Promise<User> {
    const { projection } = aqp(query);

    const user = await this.userModel
      .findOne({ idBBVA: userIdBBVA })
      .select(projection)
      .exec();

    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    return user.toObject();
  }

  async createUser(userData: SignupUserDto): Promise<User> {
    const user = await (await this.userModel.create(userData)).save();

    if (!user) {
      throw new BadRequestException('No se pudo crear el usuario');
    }

    return user.toObject();
  }

  async update(userId, userData: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(userId, userData);

    if (!user) {
      throw new BadRequestException('No se pudo actualizar el usuario');
    }

    return user;
  }
}
