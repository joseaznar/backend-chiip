import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user1@x.com',
    minLength: 5,
    maxLength: 50,
    type: String,
    required: false,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'Pedro Perez',
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  name: string;
}
