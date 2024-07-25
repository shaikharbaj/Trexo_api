import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_NOTIFICATION_TO_NOTIFICATION_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'NOTIFICATION_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'notification-api-gateway',
      brokers: [process.env.NOTIFICATION_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'notification-api-gateway-consumer',
    },
  },
};