import { Controller, Get, Inject } from '@nestjs/common';
import { UserCreateService } from './user-create.service';
import { ClientRMQ, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/shared/dtos/create-user.dto';
import { ICreateUser } from '@app/shared/interfaces/create.user';

@Controller()
export class UserCreateController {
  constructor(private readonly userCreateService: UserCreateService) {}

  @MessagePattern({ cmd: 'user-create' })
  handleUserCreate(@Payload() createUser: ICreateUser) {
    return this.userCreateService.create(createUser);
  }
}
