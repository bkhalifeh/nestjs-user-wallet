import { Controller, Get } from '@nestjs/common';
import { UserUpdateService } from './user-update.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUpdateUser } from '@app/shared';

@Controller()
export class UserUpdateController {
  constructor(private readonly userUpdateService: UserUpdateService) {}

  @MessagePattern({ cmd: 'user-update' })
  handleUserUpdate(@Payload() data: IUpdateUser) {
    return this.userUpdateService.update(data);
  }
}
