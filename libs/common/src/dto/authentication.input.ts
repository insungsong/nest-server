import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ServiceType } from '../constant/service-type';
import { StringTransform } from '../transformer';

@InputType({ description: '유저 로그인' })
export class AuthenticationInput {
  @Length(6, 320)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String, {
    nullable: false,
    description: '이메일',
  })
  @StringTransform()
  email!: string;

  @Length(8, 16)
  @IsNotEmpty()
  @IsString()
  @Field(() => String, {
    nullable: false,
    description: '비밀번호',
  })
  @StringTransform()
  password!: string;

  @IsNotEmpty()
  @IsEnum(ServiceType)
  @Field(() => ServiceType, {
    nullable: false,
    description: '카파 서비스 타입',
  })
  service!: ServiceType;
}
