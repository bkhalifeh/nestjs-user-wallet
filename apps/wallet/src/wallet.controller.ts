import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @MessagePattern({ cmd: 'user-created' })
  handleCreatedUser(@Payload() data) {
    return this.walletService.create(data.userId);
  }

  @MessagePattern({ cmd: 'wallet-get' })
  handleWalletGet(@Payload() data) {
    return this.walletService.findOne(data.userId);
  }

  @MessagePattern({ cmd: 'wallet-update' })
  handleWalletUpdate(@Payload() data) {
    return this.walletService.update(data.userId, data.amount);
  }
}
