import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { ComputesService } from '../services/compute.service';
import { AuthGuard } from '@nestjs/passport';
import { FindByIdBBVAParams } from '../dtos/find-by-idBBVA-params.dto copy';
import { Compute } from '../models/compute.model';
import { ComputeBasicValueDto } from '../dtos/compute-basic-value.dto';

@ApiTags('Computations')
@ApiSecurity('X-API-KEY', ['X-API-KEY'])
@Controller('computations')
export class ComputationsController {
  constructor(private readonly service: ComputesService) {}

  @UseGuards(AuthGuard('api-key'))
  @Get(':idBBVA')
  async getComputationsByIdBBVA(@Param() params: FindByIdBBVAParams): Promise<Compute[]> {
    return this.service.findComputationsByIdBBVA(params.idBBVA);
  }

  @UseGuards(AuthGuard('api-key'))
  @Post('')
  async computeBasicValue(@Body() dto: ComputeBasicValueDto): Promise<any> {
    return this.service.computeBasicValue(dto);
  }
}
