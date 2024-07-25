import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_USER_ADDRESS_TO_USER_MICROSERVICE_KAFKA_REGISTRY = {
    name: 'USER_MICROSERVICE',
    transport: myTransport,
    options: {
      client: {
        clientId: 'user-address-api-gateway',
        brokers: [process.env.USER_MICROSERVICE_BROKER],
      },
      consumer: {
        groupId: 'user-address-api-gateway-consumer',
      },
    },
  };