import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComputeDocument = Compute & Document;

/***
 * @export
 * @class Compute
 */
@Schema()
export class Compute {
  id: string;

  @ApiProperty({
    description: 'The BBVA use id.',
    example: 'kdksk332Dsss',
  })
  @Prop()
  idBBVA: string;

  @ApiProperty({
    description: "The computed value with basic information.",
    example: '13.4',
  })
  // #endregion Documentation
  @Prop()
  basicValue: number;

  @ApiProperty({
    description: "The computed value with advanced information.",
    example: '15.2',
  })
  // #endregion Documentation
  @Prop()
  advancedValue: number;

  @ApiProperty({
    type: Date,
    readOnly: true
  })
  // #endregion Documentation
  @Prop({ default: Date.now() })
  createedAt: Date;
}

export const ComputeSchema = SchemaFactory.createForClass(Compute);
