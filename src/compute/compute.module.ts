import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ComputationsController } from './controllers/compute.controller';
import { Compute, ComputeSchema } from './models/compute.model';
import { ComputesService } from './services/compute.service';
import { ComputeRepository } from './repositories/compute.repository';
import { CompanyModule } from 'src/companies/companies.module';
import { UsersModule } from 'src/users/users.module';
import { CompanyService } from 'src/companies/services/companies.service';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Compute.name, schema: ComputeSchema }]),
    AuthModule,
    CompanyModule,
    UsersModule,
  ],
  controllers: [ComputationsController],
  providers: [ComputeRepository, ComputesService, CompanyService, UsersService],
  exports: [ComputesService, ComputeRepository],
})
export class ComputeModule {}
