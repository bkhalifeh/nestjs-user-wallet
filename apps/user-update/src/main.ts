import { NestFactory } from '@nestjs/core';
import { UserUpdateModule } from './user-update.module';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(UserUpdateModule);
  const sharedService = app.get(SharedService);
  app.connectMicroservice(sharedService.getRmqOptions('user_update'));
  app.startAllMicroservices();
}
bootstrap();
