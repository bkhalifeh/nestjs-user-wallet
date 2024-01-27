import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdateController } from './user-update.controller';
import { UserUpdateService } from './user-update.service';

describe('UserUpdateController', () => {
  let userUpdateController: UserUpdateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserUpdateController],
      providers: [UserUpdateService],
    }).compile();

    userUpdateController = app.get<UserUpdateController>(UserUpdateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userUpdateController.getHello()).toBe('Hello World!');
    });
  });
});
