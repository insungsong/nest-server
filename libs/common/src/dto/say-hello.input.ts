import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'SayHelloInput' })
export class SayHelloInput {
  @Field(() => String)
  value: string;
}
