import { registerEnumType } from '@nestjs/graphql';

export enum ServiceType {
  USER = 'USER',
}

registerEnumType(ServiceType, {
  name: 'ServiceType',
  description: '서비스 타입',
  valuesMap: {
    USER: {
      description: '일반 유저',
    },
  },
});
