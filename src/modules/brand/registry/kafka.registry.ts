import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_BRAND_TO_MASTER_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'MASTER_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'brand-api-gateway',
      brokers: [process.env.MASTER_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'brand-api-gateway-consumer',
    },
  },
};