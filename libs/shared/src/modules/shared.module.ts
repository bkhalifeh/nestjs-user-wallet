import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { SharedService } from '../services/shared.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {
  static registerRmq(service: string): DynamicModule {
    const providers = [
      {
        provide: `${service.toUpperCase()}_SERVICE`,
        useFactory: (configService: ConfigService) => {
          console.log(`${service.toUpperCase()}_SERVICE`);
          console.log(`RABBITMQ_${service.toUpperCase()}_QUEUE`);
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://rabbitmq-srv:5672`],
              queue: configService.get<string>(
                `RABBITMQ_${service.toUpperCase()}_QUEUE`,
              ),
              queueOptions: {
                durable: false,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }
}
