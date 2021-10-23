import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthorizationErrorDto {
  @ApiResponseProperty({ example: 1 })
  errorCode: string;
  @ApiResponseProperty({
    example: 'Please login again. Your token has expired or is not present',
  })
  message: string;
}
