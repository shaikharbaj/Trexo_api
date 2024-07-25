import { Transport } from '@nestjs/microservices';

//Setting up transport
const myTransport: Transport = Transport.KAFKA;


export const API_GATEWAY_CONTACT_US_TO_MASTER_MICROSERVICE_KAFKA_REGISTRY = {
  name: 'MASTER_MICROSERVICE',
  transport: myTransport,
  options: {
    client: {
      clientId: 'contact-us-api-gateway',
      brokers: [process.env.MASTER_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: 'contact-us-api-gateway-consumer',
    },
  },
};