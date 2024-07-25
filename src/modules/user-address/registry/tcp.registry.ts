import { Transport } from '@nestjs/microservices';
const myTransport: Transport = Transport.TCP;

export const USER_MICROSERVICE_TCP_REGISTRY = {
  transport: myTransport,
  name: 'USER_MICROSERVICE',
  options: {
    host: '0.0.0.0',
    port: parseInt(process.env.USER_MICROSERVICE_PORT),
  },
};
