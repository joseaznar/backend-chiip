import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
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
    description: 'The id given for the user and that was assigned for the company as well (cd_cliente field).',
    example: 'kdm4slasla1',
    maxLength: 50,
    type: String,
    required: true,
  })
  @IsString()
  @MaxLength(100)
  idBBVA: string;
}
