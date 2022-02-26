import { CommonModule } from '@libs/common';
import { Module } from '@nestjs/common';
import { AuthenticationProxyService } from './authentication.proxy.service';
import { AuthenticationResolver } from './authentication.resolver';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NestConfigService } from '@libs/common/config/nest-config.service';
import { AUTHENTICATION } from '@libs/common/constant';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: 'AUTHENTICATION_SERVICE',
      useFactory: (config: NestConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              `${config.rabbitmqProto}://${config.rabbitmqUser}:${config.rabbitmqPass}@${config.rabbitmqHost}:${config.rabbitmqPort}`,
            ],
            queue: AUTHENTICATION,
            noAck: true,
            queueOptions: {
              durable: true,
            },
          },
        }),
      inject: [NestConfigService],
    },
    AuthenticationProxyService,
    AuthenticationResolver,
  ],
})
export class AuthenticationModule {}
