import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  Environment,
  NestConfigService,
} from '@libs/common/config/nest-config.service';
import { NestConfigModule } from '@libs/common/config/nest-config.module';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [
    ProxyModule,
    NestConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config: NestConfigService) => ({
        path: 'v1/graphql',
        autoSchemaFile: 'schema.gql',
        playground: config.nodeEnv === Environment.DEFAULT ? true : false,
        context: async ({ req, connection }) => {
          if (connection) {
            return {
              req: {
                headers: {
                  authorization: connection.context.Authorization,
                },
              },
            };
          } else return { req };
        },
      }),
      inject: [NestConfigService],
    }),
  ],
})
export class GatewayModule {}
