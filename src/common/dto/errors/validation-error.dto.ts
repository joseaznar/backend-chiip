import { ApiResponseProperty } from '@nestjs/swagger';

export class ValidationItemDto {
  // tslint:disable-next-line: object-literal-key-quotes
  @ApiResponseProperty({ example: { id: 'not_mongo_id' } })
  target: Map<string, any>;
  @ApiResponseProperty({ example: 'not_mongo_id' })
  value: any;
  @ApiResponseProperty({ example: 'id' })
  property: string;
  @ApiResponseProperty()
  children: [];
  // tslint:disable-next-line: object-literal-key-quotes
  @ApiResponseProperty({
    example: { isMongoId: 'id must be a mongodb id' },
  })
  constraints: Map<string, string>;
}

// tslint:disable-next-line: max-classes-per-file
export class ValidationErrorDto {
  @ApiResponseProperty({ example: 400 })
  statusCode: number;
  @ApiResponseProperty({ example: 'Bad Request' })
  error: string;
  @ApiResponseProperty({ type: [ValidationItemDto] })
  message: ValidationItemDto[];
}
