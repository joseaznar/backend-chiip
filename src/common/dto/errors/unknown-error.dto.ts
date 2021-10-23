import { ApiResponseProperty } from '@nestjs/swagger';

export class UnknownErrorDto {
  @ApiResponseProperty({ example: 500 })
  statusCode: number;
  @ApiResponseProperty({ example: 'Internal server error' })
  message: string;
}
