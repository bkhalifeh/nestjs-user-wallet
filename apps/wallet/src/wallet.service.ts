import { WalletModel } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(WalletModel.name)
    private readonly walletModel: Model<WalletModel>,
  ) {}
  async create(userId: string) {
    let wallet = new this.walletModel({ userId });
    try {
      wallet = await wallet.save();
      console.log(wallet);
      return {
        error: false,
        data: wallet,
      };
    } catch (e) {
      return {
        error: true,
        data: e.message,
      };
    }
  }

  findOne(userId: string) {
    return this.walletModel.findOne({
      userId,
    });
  }

  update(userId: string, amount: number) {
    return this.walletModel.findOneAndUpdate({ userId }, { $set: { amount } });
  }
}
