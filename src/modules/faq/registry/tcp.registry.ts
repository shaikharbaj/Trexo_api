import { Transport } from '@nestjs/microservices';
const myTransport: Transport = Transport.TCP;

export const CMS_MICROSERVICE_TCP_REGISTRY = {
  transport: myTransport,
  name: 'CMS_MICROSERVICE',
  options: {
    host: '0.0.0.0',
    port: parseInt(process.env.CMS_MICROSERVICE_PORT),
  },
};
