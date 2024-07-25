import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;

export const API_GATEWAY_AUTH_TO_AUTH_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'AUTH_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'auth-api-gateway',
      brokers: [process.env.AUTH_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'auth-api-gateway-consumer',
    },
  },
};
