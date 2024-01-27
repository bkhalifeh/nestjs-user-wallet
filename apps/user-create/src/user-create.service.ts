import { UserModel } from '@app/shared';
import { ICreateUser } from '@app/shared/interfaces/create.user';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserCreateService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @Inject('WALLET_SERVICE')
    private readonly walletService: ClientRMQ,
  ) {}
  async create(createUser: ICreateUser) {
    let user = new this.userModel(createUser);
    try {
      user = await user.save();
      this.walletService
        .send({ cmd: 'user-created' }, { userId: user.id })
        .subscribe();
      return {
        error: false,
        data: user,
      };
    } catch (e) {
      return {
        error: true,
        data: e.message,
      };
    }
  }
}
