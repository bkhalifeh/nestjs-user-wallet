import { Module } from '@nestjs/common';
import { UserUpdateController } from './user-update.controller';
import { UserUpdateService } from './user-update.service';
import { SharedModule, UserModel, UserSchema } from '@app/shared';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRoot('mongodb://mongodb-srv:27017/nestjs-uw'),
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
    ]),
    SharedModule.registerRmq('wallet'),
  ],
  controllers: [UserUpdateController],
  providers: [UserUpdateService],
})
export class UserUpdateModule {}
