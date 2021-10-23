import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './models/companies.model';
import { CompanyController } from './controllers/companies.controller';
import { CompanyRepository } from './repositories/companies.repository';
import { CompanyService } from './services/companies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyRepository, CompanyService],
  exports: [CompanyService, CompanyRepository],
})
export class CompanyModule {}
