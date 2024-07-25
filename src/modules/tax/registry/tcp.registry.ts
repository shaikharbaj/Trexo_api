import { Transport } from '@nestjs/microservices';
const myTransport: Transport = Transport.TCP;

export const MASTER_MICROSERVICE_TCP_REGISTRY = {
  transport: myTransport,
  name: 'MASTER_MICROSERVICE',
  options: {
    host: '0.0.0.0',
    port: parseInt(process.env.MASTER_MICROSERVICE_PORT),
  },
};
