import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber
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
    description: 'Código que identifica el grupo empresarial al que pertence cada cliente',
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  cd_grupo: string;

  @ApiProperty({
    description: 'Nivel de grupo de acuerdo al nivel de rentabilidad y ventas asociadas al grupo',
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  nivel_grupo: string;

  @ApiProperty({
    description: 'Código de sector económico al cual pertenece cada empresa',
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  tp_sector: string;

  @ApiProperty({
    description: 'Código de estado de la republica al que pertenece el domicilio del cliente',
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  cd_estado: string;

  @ApiProperty({
    description: 'Nombre del sector económico o actividad económica que práctica el cliente',
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  mm_sector: string;

  @ApiProperty({
    description: 'Monto de los recursos en promedio que el cliente deja en cuentas de cheques o inversiones',
    type: Number,
    required: true,
  })
  @IsNumber()
  recursos: number;

  @ApiProperty({
    description: 'Monto del credito otorgado en promedio al cliente',
    type: Number,
    required: true,
  })
  @IsNumber()
  credito: number;

  @ApiProperty({
    description: 'Monto pagado a cfe acumulado en los últimos 12 meses',
    type: Number,
    required: true,
  })
  @IsNumber()
  rentabilidad: number;

  @ApiProperty({
    description: 'Monto pagado a cfe acumulado en los últimos 12 meses',
    type: Number,
    required: true,
  })
  @IsNumber()
  consumo_cfe_12m: number;

  @ApiProperty({
    description: 'Número de operaciones de pago a cfe acumulado en los últimos 12 meses',
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
}
