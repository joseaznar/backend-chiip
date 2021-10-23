import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindByIdQuery } from '../../common/dto/query/find-by-id-query.dto';
import * as aqp from 'api-query-params';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../models/companies.model';
import { CreateCompanyDto } from '../dtos/create-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name)
    readonly companyModel: Model<Company>,
  ) {}

  async findCompanyById(companyId: string, query?: FindByIdQuery): Promise<Company> {
    const { projection } = aqp(query);

    const Company =  await this.companyModel.findById(companyId).select(projection).exec();

    if (!Company) {
      throw new NotFoundException('No se encontró el usuario')
    }

    return Company.toObject() 
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    const company = await (await this.companyModel.create(data)).save();

    if (!company) {
      throw new BadRequestException('No se pudo crear la compañía');
    }

    return company.toObject();
  }
}
