import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'sayHello Output' })
export class SayHelloOuput {
  @Field(() => String)
  value: string;
}
