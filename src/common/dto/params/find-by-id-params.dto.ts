import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FindByIdParams {
  @ApiProperty({
    description: 'The id of the document to find',
    example: '5d08064964e498529c1a1190',
  })
  @IsMongoId()
  id: string;
}
