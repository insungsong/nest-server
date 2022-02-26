import { Field, Float, ObjectType } from '@nestjs/graphql';
import { One } from './output.model';

@ObjectType({ description: '' })
class RegisterUser {
  @Field(() => String, { nullable: false, description: 'JWT' })
  accessToken: string;

  @Field(() => String, {
    nullable: false,
    defaultValue: 'Bearer',
    description: '',
  })
  tokenType!: string;

  @Field(() => Float, { nullable: false, description: 'expiresIn' })
  expiresIn!: number;

  @Field(() => String, { nullable: false, description: 'JWT' })
  refreshToken!: string;
}

@ObjectType()
export class RegisterUserOutput extends One(RegisterUser) {}
