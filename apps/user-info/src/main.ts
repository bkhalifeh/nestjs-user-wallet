import { NestFactory } from '@nestjs/core';
import { UserInfoModule } from './user-info.module';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(UserInfoModule);
  const sharedService = app.get(SharedService);
  app.connectMicroservice(sharedService.getRmqOptions('user_info'));
  app.startAllMicroservices();
}
bootstrap();
