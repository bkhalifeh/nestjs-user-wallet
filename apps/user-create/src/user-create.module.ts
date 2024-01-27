import { Module } from '@nestjs/common';
import { UserCreateController } from './user-create.controller';
import { UserCreateService } from './user-create.service';
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
  controllers: [UserCreateController],
  providers: [UserCreateService],
})
export class UserCreateModule {}
