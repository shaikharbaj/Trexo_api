import { Transport } from "@nestjs/microservices";

//Setting up transport
const myTransport: Transport = Transport.KAFKA;

export const API_GATEWAY_CMS_TO_CMS_MICROSERVICE_KAFKA_REGISTRY = {
  name: "CMS_MICROSERVICE",
  transport: myTransport,
  options: {
    client: {
      clientId: "cms-api-gateway",
      brokers: [process.env.CMS_MICROSERVICE_BROKER],
    },
    consumer: {
      groupId: "cms-api-gateway-consumer",
    },
  },
};
