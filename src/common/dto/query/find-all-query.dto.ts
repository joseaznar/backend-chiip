import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString } from 'class-validator';

export class FindAllQuery {
    @ApiProperty({
        example: '15',
        required: false,
        description: 'limits the amount of elements returned by the method',
    })
    @IsOptional()
    @IsNumberString()
    limit?: string;

    @ApiProperty({
        example: '15',
        required: false,
        description:
            'skips the specified number of elements, useful for paging',
    })
    @IsOptional()
    @IsNumberString()
    skip?: string;

    @ApiProperty({
        example: '-property1',
        required: false,
        description:
            'specifies which property to use to sort the elements, prefix the property name with - for desc sort',
    })
    @IsOptional()
    sort?: string;

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
