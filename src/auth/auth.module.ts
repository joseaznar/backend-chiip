import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { HeaderApiKeyStrategy } from './strategies/auth-header-api-key.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [],
  providers: [HeaderApiKeyStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
