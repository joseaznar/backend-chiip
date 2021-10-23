import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsMongoId
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user1@x.com',
    minLength: 5,
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'Pedro Perez',
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsMongoId()
  company: string;

  @ApiProperty({
    description: "The user's BBVA id",
    example: 'lsl3342XSSss1',
    maxLength: 50,
    type: String,
    required: false,
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  idBBVA: string;
}
