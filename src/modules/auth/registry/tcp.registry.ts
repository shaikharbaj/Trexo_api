import { Transport } from '@nestjs/microservices';
const myTransport: Transport = Transport.TCP;

export const AUTH_MICROSERVICE_TCP_REGISTRY = {
  transport: myTransport,
  name: 'AUTH_MICROSERVICE',
  options: {
    host: '0.0.0.0',
    port: parseInt(process.env.AUTH_MICROSERVICE_PORT),
  },
};
