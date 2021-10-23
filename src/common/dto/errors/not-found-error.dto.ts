import { ApiResponseProperty } from '@nestjs/swagger';

export class NotFoundErrorDto {
  @ApiResponseProperty({ example: 11 })
  errorCode: string;
  @ApiResponseProperty({
    example:
      'Error finding element: element with id 5d6ab95de01190a5880271a4 not found',
  })
  message: string;
}
