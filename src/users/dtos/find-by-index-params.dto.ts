import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class FindByIndexParams {
  @ApiProperty({
    description: 'The int id of the user in BBVA',
    example: '5463',
  })
  @IsInt()
  index: number;
}
