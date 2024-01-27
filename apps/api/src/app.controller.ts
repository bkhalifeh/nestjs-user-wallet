import { UpdateUserDto } from '@app/shared';
import { CreateUserDto } from '@app/shared/dtos/create-user.dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { create } from 'domain';
import { first, firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('USER_CREATE_SERVICE')
    private readonly userCreateService: ClientRMQ,
    @Inject('USER_INFO_SERVICE')
    private readonly userInfoService: ClientRMQ,
    @Inject('USER_UPDATE_SERVICE')
    private readonly userUpdateService: ClientRMQ,
  ) {}

  @ApiBody({
    type: CreateUserDto,
  })
  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userCreateService.send({ cmd: 'user-create' }, createUserDto);
  }

  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiParam({
    name: 'id',
  })
  @Patch('user/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = this.userUpdateService.send(
      { cmd: 'user-update' },
      { userId: id, ...updateUserDto },
    );
    res.subscribe;
    return firstValueFrom(res);
  }

  @ApiParam({
    name: 'id',
  })
  @Get('user/:id/info')
  findOneUserInfo(@Param('id') id: string) {
    const res = this.userInfoService.send({ cmd: 'user-info' }, { id });
    res.subscribe();
    return firstValueFrom(res);
  }
}
