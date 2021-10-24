import { BadRequestException, Injectable } from '@nestjs/common';
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

  async computeBasicValue(data: ComputeBasicValueDto): Promise<any> {
    await this.companyService.upsert(data);
    await this.userService.upsert(data);

    const industries = {
      'Autos, components & Durable goods': 394.74,
      'Basic Materials': 398.65,
      'Capital goods & Industrial services': 400.6,
      'Construction & Construction Materials': 195.42,
      Consumer: {
        Consumo: 394.74,
        Agricultura: 416.93,
        Ganaderia: 416.93,
      },
      'Energy (Oil & Gas)': 977.08,
      'Financial Institutions': 130.93,
      'Financial Services': 261.86,
      Healthcare: 220.82,
      Institutions: 130.93,
      'Leisure & Consumer Services': {
        'Restaurantes y bares': 205.19,
        Hoteles: 265.77,
        'Parques de diversión y centros recreativos': 107.48,
        'Eventos musicales/deportivos': 107.48,
        'Industria cinematográfica': 127.02,
      },
      'Real Estate': 107.48,
      Retail: 220.82,
      'Telecoms, Technology & Media': 97.71,
      Transportation: 365.43,
      Utilities: 261.86,
    };

    let value = 0;
    try {
      value += parseFloat(`${industries[data.nm_sector]}`);
      
      if (isNaN(value)) {
        value = 0
        throw new BadRequestException()
      }
    } catch (e) {
      value += industries[data.nm_sector][data.nm_sub_sector];
    }

    if (!!data.tiempoBiodegradadoConsumo) {
      value += 1 * data.tiempoBiodegradadoConsumo;
    }

    if (!data.tieneManejoResiduos) {
      value += 20;
    }

    if (!!data.tieneReciclaje) {
      value -= 20;
    }

    if (!!data.tieneViajes) {
      value += 1;
    }

    const estados = {
      AG: 1.61,
      BN: 0.76,
      BS: 2.62,
      CA: 1.82,
      CP: 1.3,
      CH: 1.39,
      DF: 1.86,
      CU: 1.21,
      CO: 1.27,
      DU: 1.39,
      EM: 1.65,
      GO: 1.44,
      GU: 1.35,
      HI: 1.46,
      JA: 1.46,
      MI: 1.31,
      MO: 1.35,
      NA: 1.31,
      NL: 1.21,
      OA: 1.24,
      PU: 1.47,
      QU: 1.61,
      QR: 1.82,
      SL: 1.45,
      SI: 1.33,
      SO: 1.33,
      TA: 1.3,
      TM: 1.33,
      TL: 1.47,
      VE: 1.18,
      YU: 1.82,
      ZA: 1.61,
    };

    const tco2e = 0.494;

    value += (data.pagos_cfe_12m * tco2e) / (parseFloat(`${estados[data.cd_estado]}`) * 1000);


    value = value * (data.cantidadPersonas / 10);

    const computation = await this.repository.computeBasicValue(data, value);

    return computation;
  }
}
