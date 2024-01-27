import { IUpdateUser, UserModel } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserUpdateService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @Inject('WALLET_SERVICE')
    private readonly walletService: ClientRMQ,
  ) {}

  async update(updateUser: IUpdateUser) {
    const { userId, amount, ...user } = updateUser;
    await this.userModel.findByIdAndUpdate(updateUser.userId, { $set: user });
    this.walletService
      .send({ cmd: 'wallet-update' }, { userId, amount })
      .subscribe();
    return {
      error: false,
      data: 'ok',
    };
  }
}
