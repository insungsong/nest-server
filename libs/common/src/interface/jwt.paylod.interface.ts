import { ServiceType } from '../constant';

export interface Payload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
  aud: string;
  scope?: ServiceType;
  scopes?: [ServiceType];
}
