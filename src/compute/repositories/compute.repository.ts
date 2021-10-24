import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindByIdQuery } from '../../common/dto/query/find-by-id-query.dto';
import * as aqp from 'api-query-params';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ComputeBasicValueDto } from '../dtos/compute-basic-value.dto';
import { Compute } from '../models/compute.model';

@Injectable()
export class ComputeRepository {
  constructor(
    @InjectModel(Compute.name)
    readonly model: Model<Compute>,
  ) {}

  async findComputationsByIdBBVA(
    userIdBBVA: string,
    query?: FindByIdQuery,
  ): Promise<Compute[]> {
    const { projection } = aqp(query);

    const list = await this.model
      .find({ idBBVA: userIdBBVA })
      .select(projection)
      .exec();

    if (!list) {
      throw new NotFoundException('No se encontraron cálculos');
    }

    const objects = [];

    list.forEach((l) => {
      objects.push(l.toObject());
    });

    return objects;
  }

  async computeBasicValue(data: ComputeBasicValueDto, value: number): Promise<any> {
    const computation = await (await this.model.create({
      idBBVA: data.idBBVA,
      basicValue: value,
    })).save();

    if (!computation) {
      throw new BadRequestException('No se pudo realizar el cálculo');
    }

    return {...computation.toObject(), nm_sector: data.nm_sector};
  }
}
