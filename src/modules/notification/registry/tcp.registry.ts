import { Transport } from "@nestjs/microservices";
const myTransport: Transport = Transport.TCP;

export const NOTIFICATION_MICROSERVICE_TCP_REGISTRY = {
  transport: myTransport,
  name: "NOTIFICATION_MICROSERVICE",
  options: {
    host: "0.0.0.0",
    port: parseInt(process.env.NOTIFICATION_MICROSERVICE_PORT),
  },
};
