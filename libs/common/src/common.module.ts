import { Module, Global } from '@nestjs/common';
import { NestConfigModule } from './config/nest-config.module';

@Global()
@Module({
  imports: [NestConfigModule],
})
export class CommonModule {}
