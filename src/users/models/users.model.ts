import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Company } from 'src/companies/models/companies.model';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

/**
 * The non admin users of the application.
 *
 * @export
 * @class User
 */
@Schema()
export class User {
  id: string;

  // * Personal data
  // #region Documentation
  /**
   * The user\'s name.
   *
   * @type {string}
   * @memberof User
   */
  @ApiProperty({
    description: "The user's name.",
    example: 'Pedro Perez',
  })
  // #endregion Documentation
  @Prop()
  name: string;

  // #region Documentation
  /**
   * The user\'s email address.
   *
   * @type {string}
   * @memberof User
   */
  @ApiProperty({
    description: "The user's email address.",
    example: 'someaddress@example.com',
  })
  // #endregion Documentation
  @Prop()
  email: string;

  @ApiProperty({
    description: "The user's associated company information.",
    type: Company,
  })
  // #endregion Documentation
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company'  })
  company: Company;

  // #region Documentation
  /**
   * The user\'s email address.
   *
   * @type {string}
   * @memberof User
   */
  @ApiProperty({
    description: "The user's BBVA id.",
    example: 'mfmsms4medmksk2',
  })
  // #endregion Documentation
  @Prop({ required: false })
  idBBVA?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
