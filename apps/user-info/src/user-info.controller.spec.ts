import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';

describe('UserInfoController', () => {
  let userInfoController: UserInfoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserInfoController],
      providers: [UserInfoService],
    }).compile();

    userInfoController = app.get<UserInfoController>(UserInfoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userInfoController.getHello()).toBe('Hello World!');
    });
  });
});
