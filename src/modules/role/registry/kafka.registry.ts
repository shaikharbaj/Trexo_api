import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;

export const API_GATEWAY_ROLE_TO_USER_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'USER_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'role-api-gateway-user',
      brokers: [process.env.USER_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'role-api-gateway-user-consumer',
    },
  },
};
