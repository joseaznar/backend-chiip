import { Injectable } from '@nestjs/common';
import { FindByIdQuery } from 'src/common/dto/query/find-by-id-query.dto';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { Company } from '../models/companies.model';
import { CompanyRepository } from '../repositories/companies.repository';

/**
 * This class contains business logic regarding normal users
 * of the application.
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class CompanyService {
  /**
   *
   * @memberof CompanyController
   */
  constructor(private readonly companyRepository: CompanyRepository) {}

  async findCompanyById(id: string, query?: FindByIdQuery): Promise<Company> {
    const company = await this.companyRepository.findCompanyById(id, query);

    return company;
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    const company = await this.companyRepository.create(data);

    return company;
  }
}
