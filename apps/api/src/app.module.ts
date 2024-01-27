import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { AppController } from './app.controller';

@Module({
  imports: [
    SharedModule.registerRmq('user_create'),
    SharedModule.registerRmq('user_info'),
    SharedModule.registerRmq('user_update'),
    // SharedModule.registerRmq('WALLET_SERVICE', 'wallet_queue'),
  ],
  controllers: [AppController],
})
export class AppModule {}
