import { NestConfigModule } from '@libs/common/config/nest-config.module';
import { NestConfigService } from '@libs/common/config/nest-config.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

async function ormConfig(): Promise<TypeOrmModuleOptions> {
  const cli = await NestFactory.create<NestExpressApplication>(
    NestConfigModule,
  );
  cli.useGlobalPipes(new ValidationPipe());

  const config: NestConfigService =
    cli.get<NestConfigService>(NestConfigService);

  const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbDatabase,
    schema: config.dbSchema,
    keepConnectionAlive: true,
    entities: [],
    migrations: [join(__dirname, 'migrations/v1/*.{ts, js}')],
    subscribers: [],
    synchronize: config.dbSync,
    logging: config.dbDebug,
    extra: {
      connectionLimit: 5,
    },
  };

  return Promise.resolve(ormConfig);
}

export = ormConfig();
