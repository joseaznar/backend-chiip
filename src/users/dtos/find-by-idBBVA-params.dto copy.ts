import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindByIdBBVAParams {
  @ApiProperty({
    description: 'The id of the user in BBVA',
    example: '5d08064964e498529c1a1190',
  })
  @IsString()
  idBBVA: string;
}
