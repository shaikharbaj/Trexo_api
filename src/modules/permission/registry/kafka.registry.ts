import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;

export const API_GATEWAY_PERMISSION_TO_USER_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'USER_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'permission-api-gateway-user',
      brokers: [process.env.USER_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'permission-api-gateway-user-consumer',
    },
  },
};
