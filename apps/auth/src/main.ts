import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);

  const USER = configService.get<string>('RABBITMQ_USER');
  const PASSWORD = configService.get<string>('RABBITMQ_PASS');
  const HOST = configService.get<string>('RABBITMQ_HOST');
  const QUEUE = configService.get<string>('RABBITMQ_AUTH_QUEUE');

  /*
    note:- 
        => this will set up the auth microservices.
        => instead of lensing on port we well listen for 
        message from the message broker like 
        (RABBITMQ, KafkaJS ...)
  */
  app.connectMicroservice({
    //transport
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
