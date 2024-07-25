import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_FAQ_TO_CMS_MICROSERVICE_KAFKA_REGISTRY = {
    name: 'CMS_MICROSERVICE',
    transport: myTransport,
    options: {
      client: {
        clientId: 'faq-api-gateway',
        brokers: [process.env.CMS_MICROSERVICE_BROKER],
      },
      consumer: {
        groupId: 'faq-api-gateway-consumer',
      },
    },
  };