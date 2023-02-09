import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    const chanel = context.getChannelRef();
    const message = context.getMessage();

    //to tell we accolade the message
    chanel.ack(message);
    return await this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    const chanel = context.getChannelRef();
    const message = context.getMessage();

    //to tell we accolade the message
    chanel.ack(message);
    return await this.authService.postUser();
  }
}
