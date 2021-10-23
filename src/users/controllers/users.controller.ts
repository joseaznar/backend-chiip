import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';
import { User } from '../models/users.model';
import { UsersService } from '../services/users.service';
import { AuthGuard } from '@nestjs/passport';
import { FindByIdParams } from 'src/common/dto/params/find-by-id-params.dto';
import { SignupUserDto } from '../dtos/sign-up-user.dto';
import { FindByIdBBVAParams } from '../dtos/find-by-idBBVA-params.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

/**
 * Any incoming request to /users will be handled by this controller thanks to the controller decorator.
 *
 * @export
 * @class UsersController
 */
@ApiTags('Users')
@ApiSecurity('X-API-KEY', ['X-API-KEY'])
@Controller('users')
export class UsersController {
  /**
   * NestJS Logger
   *
   * @memberof UsersController
   */

  /**
   * Creates an instance of UsersController.
   * Users service can be injected here because it a TypeScript class with the injectable decorator.
   * @param {UsersService} usersService
   * @memberof UsersController
   */
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard('api-key'))
  @Get(':id')
  async getUserById(@Param() params: FindByIdParams): Promise<User> {
    return this.userService.findUserById(params.id);
  }

  @UseGuards(AuthGuard('api-key'))
  @Get(':idBBVA')
  async getUserByIdBBVA(@Param() params: FindByIdBBVAParams): Promise<User> {
    return this.userService.findUserByIdBBVA(params.idBBVA);
  }

  @UseGuards(AuthGuard('api-key'))
  @Post('')
  async signup(@Body() signupUserDto: SignupUserDto): Promise<User> {
    return this.userService.signUp(signupUserDto);
  }

  @UseGuards(AuthGuard('api-key'))
  @Patch(':id')
  async update(
    @Param() params: FindByIdParams,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(params.id, userData);
  }
}
