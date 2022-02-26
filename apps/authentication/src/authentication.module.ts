import { NestConfigModule } from '@libs/common/config/nest-config.module';
import { DatabaseModule } from '@libs/database';
import { UserRepository } from '@libs/database/repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    NestConfigModule,
    DatabaseModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
