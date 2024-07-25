import { Transport } from '@nestjs/microservices';
const myTransport: Transport = Transport.TCP;

export const PRODUCT_MICROSERVICE_TCP_REGISTRY = {
  transport: myTransport,
  name: 'PRODUCT_MICROSERVICE',
  options: {
    host: '0.0.0.0',
    port: parseInt(process.env.PRODUCT_MICROSERVICE_PORT),
  },
};
