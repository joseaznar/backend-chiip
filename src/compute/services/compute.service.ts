import { Injectable } from '@nestjs/common';
import { FindByIdQuery } from 'src/common/dto/query/find-by-id-query.dto';
import { CompanyService } from 'src/companies/services/companies.service';
import { UsersService } from 'src/users/services/users.service';
import { ComputeBasicValueDto } from '../dtos/compute-basic-value.dto';
import { Compute } from '../models/compute.model';
import { ComputeRepository } from '../repositories/compute.repository';

@Injectable()
export class ComputesService {
  constructor(
    private readonly repository: ComputeRepository,
    private readonly companyService: CompanyService,
    private readonly userService: UsersService,
  ) {}

  async findComputationsByIdBBVA(
    userIdBBVA: string,
    query?: FindByIdQuery,
  ): Promise<Compute[]> {
    const computations = await this.repository.findComputationsByIdBBVA(
      userIdBBVA,
      query,
    );

    return computations;
  }

  async computeBasicValue(data: ComputeBasicValueDto): Promise<Compute> {
    const company = await this.companyService.upsert(data);
    const user = await this.userService.upsert(data);
    const computation = await this.repository.computeBasicValue(data);

    return computation;
  }
}
