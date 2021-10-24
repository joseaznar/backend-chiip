import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindByIndexParams {
  @ApiProperty({
    description: 'The int id of the user in BBVA',
    example: '5463',
  })
  @IsNumberString()
  index: number;
}
