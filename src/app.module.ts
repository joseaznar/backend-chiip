import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configurations from './config/configurations';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './companies/companies.module';
import { ComputeModule } from './compute/compute.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule,
    CompanyModule,
    ComputeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
