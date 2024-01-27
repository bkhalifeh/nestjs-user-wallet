import { NestFactory } from '@nestjs/core';
import { UserCreateModule } from './user-create.module';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(UserCreateModule);

  const sharedService = app.get(SharedService);
  app.connectMicroservice(sharedService.getRmqOptions('user_create'));
  app.startAllMicroservices();
}
bootstrap();
