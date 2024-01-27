import { Controller, Get } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @MessagePattern({ cmd: 'user-info' })
  handleUserInfo(@Payload() data) {
    return this.userInfoService.userInfo(data.id);
  }
}
