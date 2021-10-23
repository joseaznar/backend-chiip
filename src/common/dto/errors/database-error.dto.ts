import { ApiResponseProperty } from '@nestjs/swagger';

export class DatabaseErrorDto {
  @ApiResponseProperty({ example: 13 })
  errorCode: string;
  @ApiResponseProperty({
    example: 'Error <finding/retrieving/creating/updating/deleting> element(s)',
  })
  message: string;
}
