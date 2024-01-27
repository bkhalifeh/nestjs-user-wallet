import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

describe('WalletAddController', () => {
  let walletAddController: WalletController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    walletAddController = app.get<WalletController>(WalletController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(walletAddController.getHello()).toBe('Hello World!');
  //   });
  // });
});
