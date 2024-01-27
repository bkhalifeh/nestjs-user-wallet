import { Test, TestingModule } from '@nestjs/testing';
import { UserCreateController } from './user-create.controller';
import { UserCreateService } from './user-create.service';

describe('UserCreateController', () => {
  let userCreateController: UserCreateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserCreateController],
      providers: [UserCreateService],
    }).compile();

    userCreateController = app.get<UserCreateController>(UserCreateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(userCreateController.getHello()).toBe('Hello World!');
    });
  });
});
