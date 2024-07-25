import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_CATEGORY_TO_PRODUCT_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'product_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'category-api-gateway',
      brokers: [process.env.PRODUCT_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'category-api-gateway-consumer',
    },
  },
};