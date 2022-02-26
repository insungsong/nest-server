import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SayHelloOuput } from '@libs/common/model/say-hello.output';
import { lastValueFrom } from 'rxjs';
import { RegisterUserInput, SayHelloInput } from '@libs/common/dto';
import { NestException, RegisterUserOutput } from '@libs/common/model';
import { AuthenticationInput } from '@libs/common/dto/authentication.input';
import { AuthenticationOutput } from '@libs/common/model/authentication.model';

@Injectable()
export class AuthenticationProxyService {
  private readonly logger: Logger;

  constructor(@Inject('AUTHENTICATION_SERVICE') private client: ClientProxy) {
    this.logger = new Logger('AuthenticationProxyService');
  }

  async sayHello(input: SayHelloInput) {
    return await lastValueFrom(
      this.client.send<SayHelloOuput>({ cmd: 'sayHello' }, input),
    );
  }

  async authenticate(
    input: AuthenticationInput,
  ): Promise<AuthenticationOutput> {
    try {
      return await lastValueFrom(
        this.client.send<AuthenticationOutput, AuthenticationInput>(
          { cmd: 'authenticate' },
          input,
        ),
      );
    } catch (error) {
      this.logger.error(error);
      throw NestException.processException(error);
    }
  }

  async registerUser(input: RegisterUserInput): Promise<RegisterUserOutput> {
    this.logger.debug(input);
    return await lastValueFrom(
      this.client.send<RegisterUserOutput>({ cmd: 'registerUser' }, input),
    );
  }
}
