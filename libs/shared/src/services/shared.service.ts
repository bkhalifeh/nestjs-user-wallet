import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class SharedService {
  constructor(private readonly configService: ConfigService) {}

  getRmqOptions(queue: string): RmqOptions {
    // const USER = this.configService.get('RABBITMQ_USER');
    // const PASSWORD = this.configService.get('RABBITMQ_PASS');
    // const HOST = this.configService.get('RABBITMQ_HOST');
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://rabbitmq-srv:5672`],
        noAck: false,
        queue: this.configService.get<string>(
          `RABBITMQ_${queue.toUpperCase()}_QUEUE`,
        ),
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
