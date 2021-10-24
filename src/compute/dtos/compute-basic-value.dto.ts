import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComputeBasicValueDto {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user1@x.com',
    minLength: 5,
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'Pedro Perez',
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  nameUser: string;

  @ApiProperty({
    description: 'The name of the company.',
    maxLength: 500,
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  nameCompany: string;

  @ApiProperty({
    description:
      'Código de estado de la republica al que pertenece el domicilio del cliente',
    type: String,
    enum: [
      'AG',
      'BN',
      'BS',
      'CA',
      'CP',
      'CH',
      'DF',
      'CU',
      'CO',
      'DU',
      'EM',
      'GO',
      'GU',
      'HI',
      'JA',
      'MI',
      'MO',
      'NA',
      'NL',
      'OA',
      'PU',
      'QU',
      'QR',
      'SL',
      'SI',
      'SO',
      'TA',
      'TM',
      'TL',
      'VE',
      'YU',
      'ZA',
    ],
    required: true,
  })
  @IsString()
  @MaxLength(100)
  cd_estado: string;

  @ApiProperty({
    description:
      'Nombre del sector económico o actividad económica que práctica el cliente',
    type: String,
    enum: [
      'Autos, components & Durable goods',
      'Basic Materials',
      'Capital goods & Industrial service',
      'Construction & Construction Materials',
      'Consumer',
      'Energy (Oil & Gas)',
      'Financial Institutions',
      'Financial Services',
      'Healthcare',
      'Institutions',
      'Leisure & Consumer Services',
      'Real Estate',
      'Retail',
      'Telecoms, Technology & Media',
      'Transportation',
      'Utilities'
    ],
    required: true,
  })
  @IsString()
  @MaxLength(100)
  nm_sector: string;

  @ApiProperty({
    description:
      'Nombre del sub sector económico o actividad económica que práctica el cliente',
    enum: [
      'Consumo',
      'Agricultura',
      'Ganaderia',
      'Restaurantes y bares',
      'Hoteles',
      'Parques de diversión y centros recreativos',
      'Eventos musicales/deportivos',
      'Industria cinematográfica',
    ],
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  nm_sub_sector?: string;

  @ApiProperty({
    description:
      'Si es un producto de consumo hay que espeecificar cuántos años tarda en biodegradarse',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  tiempoBiodegradadoConsumo?: number;

  @ApiProperty({
    description: 'Si tiene o no manejo de residuos',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  tieneManejoResiduos?: boolean;

  @ApiProperty({
    description: 'Si tiene o no reciclaje',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  tieneReciclaje?: boolean;

  @ApiProperty({
    description: 'Si tiene o no viajes de negocio',
    type: Boolean,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  tieneViajes?: boolean;

  @ApiProperty({
    description:
      'Número de operaciones de pago a cfe acumulado en los últimos 12 meses',
    type: Number,
    required: true,
  })
  @IsNumber()
  pagos_cfe_12m: number;

  @ApiProperty({
    description: 'En caso de no ser clientee BBVA generar uuid',
    type: String,
    required: true,
  })
  @IsString()
  idBBVA: string;

  @ApiProperty({
    description:
      'Número de personas en la empresa',
    type: Number,
    required: true,
  })
  @IsNumber()
  cantidadPersonas: number;
}
