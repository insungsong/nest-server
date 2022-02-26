import { registerEnumType } from '@nestjs/graphql';

export enum ErrorCode {
  SUCCESS = 'SUCCESS',
  QUERY_ERROR = 'QUERY_ERROR',
  ERROR = 'ERROR',
  NOT_ALLOWED_USER = 'NOT_ALLOWED_USER',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  NOT_DUPLICATE_PASSWORD = 'NOT_DUPLICATE_PASSWORD',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
}

registerEnumType(ErrorCode, {
  name: 'ErrorCode',
  description: '에러코드',
  valuesMap: {
    SUCCESS: { description: '성공' },
    QUERY_ERROR: { description: 'QUERY_ERROR' },
    ERROR: { description: '에러' },
    NOT_ALLOWED_USER: { description: '가입된 유저가 아님' },
    INVALID_TOKEN: { description: '유효하지 않은 토큰' },
    TOKEN_EXPIRED: { description: '만료된 토큰' },
    UNAUTHORIZED: { description: '허가 되지 않은 접근' },
    DUPLICATE_EMAIL: { description: '이미 존재하는 이메일' },
    NOT_DUPLICATE_PASSWORD: { description: '패스워드가 일치하지 않습니다.' },
    USER_NOT_FOUND: { description: '유저를 찾을 수 없습니다.' },
    PASSWORD_INCORRECT: { description: '올바르지 않은 비밀번호 입니다.' },
  },
});
