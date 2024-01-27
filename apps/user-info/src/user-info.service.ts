import { UserDocument, UserModel } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @Inject('WALLET_SERVICE')
    private readonly walletService: ClientRMQ,
  ) {}
  async userInfo(id: string) {
    const user: UserDocument = await this.userModel.findById(id);
    const wallet = await firstValueFrom(
      this.walletService.send({ cmd: 'wallet-get' }, { userId: id }),
    );

    return {
      amount: wallet.amount,
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
