import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './models/users.model';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/companies/companies.module';
import { CompanyService } from 'src/companies/services/companies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    CompanyModule
  ],
  controllers: [UsersController],
  providers: [UserRepository, UsersService, CompanyService],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
