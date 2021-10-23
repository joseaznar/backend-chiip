import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class FindByIdQuery {
    @ApiProperty({
        example: 'property1,property2,property3',
        required: false,
        description:
            'specifies which fields to project the resulting elements into, useful for formatting',
    })
    @IsOptional()
    fields?: string;

    @ApiProperty({
        example: 'nestedproperty1,nestedproperty2',
        required: false,
        description:
            'specifies which document refs to populate prior to returning the result, useful for retrieving nested information',
    })
    @IsOptional()
    populate?: string;

    [x: string]: string;
}
