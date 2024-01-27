import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { SharedModule, WalletModel, WalletSchema } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRoot('mongodb://mongodb-srv:27017/nestjs-uw-wallet'),
    MongooseModule.forFeature([
      {
        name: WalletModel.name,
        schema: WalletSchema,
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
