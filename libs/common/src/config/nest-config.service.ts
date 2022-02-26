import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsEnum } from 'class-validator';
import { LoggerOptions } from 'typeorm';
import { OpUnitType } from 'dayjs';

export enum Environment {
  DEFAULT = '',
  LOCAL = 'local',
}

@Injectable()
export class NestConfigService {
  constructor(private readonly configService: ConfigService) {}

  @IsEnum(Environment)
  get nodeEnv(): Environment {
    return this.configService.get<Environment>('NODE_ENV', Environment.DEFAULT);
  }

  get rabbitmqProto(): string {
    return this.configService.get<string>('RABBITMQ_PROTO', 'amqp');
  }

  get rabbitmqHost(): string {
    return this.configService.get<string>('RABBITMQ_HOST', 'localhost');
  }

  get rabbitmqPort(): number {
    return this.configService.get<number>('RABBITMQ_PORT', 5672);
  }

  get rabbitmqUser(): string | undefined {
    return this.configService.get<string | undefined>('RABBITMQ_USER');
  }

  get rabbitmqPass(): string | undefined {
    return this.configService.get<string | undefined>('RABBITMQ_PASS');
  }

  get dbHost(): string {
    return this.configService.get<string>('DB_HOST', 'localhost');
  }

  get dbPort(): number {
    return this.configService.get<number>('DB_PORT', 5432);
  }

  get dbUsername(): string {
    return this.configService.get<string>('DB_USERNAME', 'postgres');
  }

  get dbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD', 'postgres');
  }

  get dbDatabase(): string {
    return this.configService.get<string>('DB_DATABASE', 'postgres');
  }

  get dbSchema(): string {
    return this.configService.get<string>('DB_SCHEMA', 'public');
  }

  get dbSync(): boolean {
    return this.configService.get<boolean>('DB_SYNC', false);
  }

  get dbDebug(): LoggerOptions {
    return this.configService.get<LoggerOptions>(
      'DB_DEBUG',
      <LoggerOptions>'error',
    );
  }

  get accessTokenExprieTimeValue(): number {
    return this.configService.get<number>(
      'ACCESS_TOKEN_EXPIRE_TIME_VALUE',
      500,
    );
  }

  get accessTokenExpireTimeUnit(): OpUnitType {
    return this.configService.get<OpUnitType>(
      'ACCESS_TOKEN_EXPIRE_TIME_UNIT',
      'minute',
    );
  }

  get refreshTokenExprieTimeValue(): number {
    return this.configService.get<number>('REFRESH_TOKEN_EXPIRE_TIME_VALUE', 1);
  }

  get refreshTokenExpireTimeUnit(): OpUnitType {
    return this.configService.get<OpUnitType>(
      'REFRESH_TOKEN_EXPIRE_TIME_UNIT',
      <OpUnitType>'month',
    );
  }

  get jwtSecret(): string {
    return this.configService.get<string>(
      'JWT_SECRET',
      '9rHWkauFqOM192f02oGh2-qmw2yXfn1rBRHTvfrNaL4',
    );
  }
}
