import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindByIdQuery } from '../../common/dto/query/find-by-id-query.dto';
import * as aqp from 'api-query-params';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from '../models/companies.model';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { ComputeBasicValueDto } from 'src/compute/dtos/compute-basic-value.dto';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name)
    readonly companyModel: Model<Company>,
  ) {}

  async findCompanyById(
    companyId: string,
    query?: FindByIdQuery,
  ): Promise<Company> {
    const { projection } = aqp(query);

    const Company = await this.companyModel
      .findById(companyId)
      .select(projection)
      .exec();

    if (!Company) {
      throw new NotFoundException('No se encontró la compañia');
    }

    return Company.toObject();
  }

  async findCompanyByIdBBVA(
    idBBVA: string,
    query?: FindByIdQuery,
  ): Promise<Company> {
    const { projection } = aqp(query);

    const Company = await this.companyModel
      .findOne({ cd_cliente: idBBVA })
      .select(projection)
      .exec();

    if (!Company) {
      throw new NotFoundException('No se encontró la compañia');
    }

    return Company.toObject();
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    const maxIndex = await this.companyModel.findOne().sort('-index').exec();

    const companyInfo = {
      ...data,
      index: maxIndex.index + 1,
    };

    const company = await (await this.companyModel.create(companyInfo)).save();

    if (!company) {
      throw new BadRequestException('No se pudo crear la compañía');
    }

    return company.toObject();
  }

  async upsert(data: ComputeBasicValueDto): Promise<void> {
    const maxIndex = await this.companyModel.findOne().sort('-index').exec();

    const companyInfo = {
      cd_estado: data.cd_estado,
      nm_sector: data.nm_sector,
      name: data.nameCompany,
      pagos_cfe_12m: data.pagos_cfe_12m,
      cd_cliente: data.idBBVA,
      index: maxIndex.index + 1,
      cantidadPersonas: data.cantidadPersonas
    };

    const company = await await this.companyModel.findOneAndUpdate(
      { cd_cliente: data.idBBVA },
      companyInfo,
      { upsert: true },
    );

    return;
  }
}
