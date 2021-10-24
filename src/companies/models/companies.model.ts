import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  id: string;

  @ApiProperty({
    description: "The company's name.",
    example: 'Empresa 1',
  })
  // #endregion Documentation
  @Prop()
  name: string;

  @ApiProperty({
    description: "Código que identifica el grupo empresarial al que pertence cada cliente",
  })
  // #endregion Documentation
  @Prop()
  cd_grupo: string;

  @ApiProperty({
    description: "Nivel de grupo de acuerdo al nivel de rentabilidad y ventas asociadas al grupo",
  })
  // #endregion Documentation
  @Prop()
  nivel_grupo: string;

  @ApiProperty({
    description: "Código de sector económico al cual pertenece cada empresa",
  })
  // #endregion Documentation
  @Prop()
  tp_sector: string;

  @ApiProperty({
    description: "Código postal del domicilio del cliente",
  })
  // #endregion Documentation
  @Prop()
  cd_postal: string;

  @ApiProperty({
    description: "Nombre del sector económico o actividad económica que práctica el cliente",
  })
  // #endregion Documentation
  @Prop()
  nm_sector: string;

  @ApiProperty({
    description: "Monto de los recursos en promedio que el cliente deja en cuentas de cheques o inversiones",
  })
  // #endregion Documentation
  @Prop()
  recursos: number;

  @ApiProperty({
    description: "Cantidad de personas en la empresa",
  })
  // #endregion Documentation
  @Prop()
  cantidadPersonas: number;

  @ApiProperty({
    description: "Monto del credito otorgado en promedio al cliente",
  })
  // #endregion Documentation
  @Prop()
  credito: number;

  @ApiProperty({
    description: "Monto pagado a cfe acumulado en los últimos 12 meses",
  })
  // #endregion Documentation
  @Prop()
  rentabilidad: number;

  @ApiProperty({
    description: "Monto pagado a cfe acumulado en los últimos 12 meses",
  })
  // #endregion Documentation
  @Prop()
  consumo_cfe_12m: number;

  @ApiProperty({
    description: "Número de operaciones de pago a cfe acumulado en los últimos 12 meses",
  })
  // #endregion Documentation
  @Prop()
  pagos_cfe_12m: number;

  @ApiProperty({
    description: "The company's state.",
    example: 'DF',
  })
  // #endregion Documentation
  @Prop()
  cd_estado: string

  @ApiProperty({
    description: "The company's client id.",
    example: 'lkskskk3kdkssk2',
  })
  // #endregion Documentation
  @Prop()
  cd_cliente: string

  @ApiProperty({
    description: "The company's int id.",
    example: '3424',
  })
  // #endregion Documentation
  @Prop()
  index: number
}

export const CompanySchema = SchemaFactory.createForClass(Company);
