import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ComputationsController } from './controllers/compute.controller';
import { Compute, ComputeSchema } from './models/compute.model';
import { ComputesService } from './services/compute.service';
import { ComputeRepository } from './repositories/compute.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Compute.name, schema: ComputeSchema }]),
    AuthModule,
  ],
  controllers: [ComputationsController],
  providers: [ComputeRepository, ComputesService],
  exports: [ComputesService, ComputeRepository],
})
export class ComputeModule {}
