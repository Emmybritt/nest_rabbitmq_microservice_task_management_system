import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { Channel, Connection } from 'amqplib';
import { Options } from 'amqplib/properties';
import { EXCHANGE, EXCHANGE_TYPE } from './constant';

@Injectable()
export class RmqService {
  private readonly connectionString: string;
  private connection?: Connection;
  public channel?: Channel;
  public setupComplete = false;

  constructor(private readonly configService: ConfigService) {}
  getOptions(queue: string, noAck = true): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBIT_MQ_URI')],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }

  publish(
    exchange: string,
    routingKey: string,
    content: object | string | boolean | number,
    options?: Options.Publish,
  ): void {
    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(content)),
      options,
    );
  }

  private async assertExchanges() {
    return await Promise.all(
      Object.values(EXCHANGE).map((e) =>
        this.channel.assertExchange(e, EXCHANGE_TYPE.topic, { durable: true }),
      ),
    );
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
