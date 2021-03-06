import { Injectable } from '@nestjs/common';
import { FindByIdQuery } from 'src/common/dto/query/find-by-id-query.dto';
import { CompanyService } from 'src/companies/services/companies.service';
import { ComputeBasicValueDto } from 'src/compute/dtos/compute-basic-value.dto';
import { SignupUserDto } from '../dtos/sign-up-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../models/users.model';
import { UserRepository } from '../repositories/users.repository';

/**
 * This class contains business logic regarding normal users
 * of the application.
 *
 * @export
 * @class UsersService
 */
@Injectable()
export class UsersService {
  /**
   *
   * @memberof UsersController
   */
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyService: CompanyService,
  ) {}

  async findUserById(userId: string, query?: FindByIdQuery): Promise<User> {
    const user = await this.userRepository.findUserById(userId, query);

    return user;
  }

  async findUserByIdBBVA(
    userIdBBVA: string,
    query?: FindByIdQuery,
  ): Promise<any> {
    const user = await this.userRepository.findUserByIdBBVA(userIdBBVA, query);
    const company = await this.companyService.findCompanyByIdBBVA(user.idBBVA);

    return { nameUser: user.name, ...user, ...company };
  }

  async findUserByIndex(
    userIndex: number,
    query?: FindByIdQuery,
  ): Promise<any> {
    const user = await this.userRepository.findUserByIndex(userIndex, query);
    const company = await this.companyService.findCompanyByIdBBVA(user.idBBVA);

    return { nameUser: user.name, ...user, ...company };
  }

  async signUp(userData: SignupUserDto): Promise<User> {
    const user = await this.userRepository.createUser(userData);

    return user;
  }

  async update(userId, userData: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(userId, userData);

    return user;
  }

  async upsert(userData: ComputeBasicValueDto): Promise<void> {
    await this.userRepository.upsert(userData);

    return;
  }
}
