import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ServiceType } from '../constant/service-type';
import { StringTransform } from '../transformer/string.transform.decorator';

@InputType('RegisterUserInput', { description: '유저 회원가입' })
export class RegisterUserInput {
  @Length(6, 320)
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '이메일' })
  @StringTransform()
  email!: string;

  @Length(8, 16)
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '비밀번호' })
  @StringTransform()
  password!: string;

  @Length(8, 16)
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { nullable: false, description: '비밀번호 확인' })
  @StringTransform()
  passwordConfirm!: string;

  @IsNotEmpty()
  @IsEnum(ServiceType)
  @Field(() => ServiceType, {
    nullable: false,
    description: '유저 서비스 타입',
  })
  service!: ServiceType;
}
