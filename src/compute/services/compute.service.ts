import { Injectable } from '@nestjs/common';
import { FindByIdQuery } from 'src/common/dto/query/find-by-id-query.dto';
import { ComputeBasicValueDto } from '../dtos/compute-basic-value.dto';
import { Compute } from '../models/compute.model';
import { ComputeRepository } from '../repositories/compute.repository';

@Injectable()
export class ComputesService {
  constructor(private readonly repository: ComputeRepository) {}

  async findComputationsByIdBBVA(userIdBBVA: string, query?: FindByIdQuery): Promise<Compute[]> {
    const computations = await this.repository.findComputationsByIdBBVA(userIdBBVA, query);

    return computations;
  }

  async computeBasicValue(data: ComputeBasicValueDto): Promise<Compute> {
    const computation = await this.repository.computeBasicValue(data);

    return computation;
  }
}
