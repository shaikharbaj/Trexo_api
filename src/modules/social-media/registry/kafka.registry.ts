import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_SOCIAL_MEDIA_TO_CMS_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'CMS_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'social-media-api-gateway',
      brokers: [process.env.CMS_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'social-media-api-gateway-consumer',
    },
  },
};