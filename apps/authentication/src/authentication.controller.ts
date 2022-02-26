import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SayHelloOuput } from '@libs/common/model/say-hello.output';
import { RegisterUserInput, SayHelloInput } from '@libs/common/dto';
import { RegisterUserOutput } from '@libs/common/model';
import { TransactionBlock } from '@libs/common/transaction/transaction';
import { AuthenticationInput } from '@libs/common/dto/authentication.input';
import { AuthenticationOutput } from '@libs/common/model/authentication.model';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern({ cmd: 'sayHello' })
  async sayHello(@Payload() input: SayHelloInput): Promise<SayHelloOuput> {
    return await this.authenticationService.getHello(input);
  }

  @MessagePattern({ cmd: 'registerUser' })
  async registerUser(
    @Payload() input: RegisterUserInput,
  ): Promise<RegisterUserOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<RegisterUserOutput> => {
        return await this.authenticationService.registerUser(
          input as RegisterUserInput,
          entityManager,
        );
      },
    );
  }

  @MessagePattern({ cmd: 'authenticate' })
  async authenticate(
    @Payload() input: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    return await TransactionBlock(
      input,
      async (input, entityManager): Promise<AuthenticationOutput> => {
        return await this.authenticationService.authenticate(
          input as AuthenticationInput,
          entityManager,
        );
      },
    );
  }
}
