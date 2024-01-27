import { NestFactory } from '@nestjs/core';
import { WalletModule } from './wallet.module';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(WalletModule);
  const sharedService = app.get(SharedService);
  app.connectMicroservice(sharedService.getRmqOptions('wallet'));
  app.startAllMicroservices();
}
bootstrap();
