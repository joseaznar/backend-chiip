import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { Company } from '../models/companies.model';
import { CompanyService } from '../services/companies.service';
import { AuthGuard } from '@nestjs/passport';
import { FindByIdParams } from 'src/common/dto/params/find-by-id-params.dto';
import { CreateCompanyDto } from '../dtos/create-company.dto';

/**
 * Any incoming request to /Companys will be handled by this controller thanks to the controller decorator.
 *
 * @export
 * @class CompanysController
 */
@ApiTags('Companies')
@ApiSecurity('X-API-KEY', ['X-API-KEY'])
@Controller('companies')
export class CompanyController {
  /**
   * NestJS Logger
   *
   * @memberof CompanyController
   */

  /**
   * Creates an instance of CompanysController.
   * Companys service can be injected here because it a TypeScript class with the injectable decorator.
   * @param {CompanyService} CompanyService
   * @memberof CompanyController
   */
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('api-key'))
  @Get(':id')
  async getCompanyById(@Param() params: FindByIdParams): Promise<Company> {
    return this.companyService.findCompanyById(params.id);
  }

  @UseGuards(AuthGuard('api-key'))
  @Post('')
  async signup(@Body() data: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(data);
  }
}
