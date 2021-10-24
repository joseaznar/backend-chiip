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
import { SignupUserDto } from '../dtos/sign-up-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ComputeBasicValueDto } from 'src/compute/dtos/compute-basic-value.dto';

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

  async findUserByIndex(
    userIndex: number,
    query?: FindByIdQuery,
  ): Promise<User> {
    const { projection } = aqp(query);

    const user = await this.userModel
      .findOne({ index: userIndex })
      .select(projection)
      .exec();

    if (!user) {
      throw new NotFoundException('No se encontró el usuario');
    }

    return user.toObject();
  }

  async createUser(userData: SignupUserDto): Promise<User> {
    const maxIndex = await this.userModel.findOne().sort('-index').exec();

    const userInfo = {
      ...userData,
      index: maxIndex.index + 1,
    };

    const user = await (await this.userModel.create(userInfo)).save();

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

  async upsert(data: ComputeBasicValueDto): Promise<void> {
    const maxIndex = await this.userModel.findOne().sort('-index').exec();
    const index = await this.userModel.findOne({ idBBVA: data.idBBVA }).exec();

    const userInfo = {
      name: data.nameUser,
      email: data.email,
      idBBVA: data.idBBVA,
      index: !!index ? index.index : maxIndex.index + 1,
    };

    const user = await this.userModel.findOneAndUpdate(
      { idBBVA: data.idBBVA },
      userInfo,
      { upsert: true },
    );

    console.log('**********')
    console.log(user);
    console.log('*********-*')

    return;
  }
}
