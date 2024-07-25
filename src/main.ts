require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppLogger } from './logging/app-logger';
import { TransformInterceptor } from './interceptor';
import { AppExceptionsFilter } from './exception';
import { AppModule } from './app.module';

const logger = new Logger('api-gateway');
const port = Number(process.env.PORT);
const host = '0.0.0.0'; // This makes the app listen on all available network interfaces

async function bootstrap() {
  const appLogger = new AppLogger();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(appLogger.createLoggerConfig),
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  });
  app.useGlobalFilters(new AppExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(port, host);
  logger.log(`ApiGateway is listening at port ${port}, timezone: ${process.env.TZ}, current time: ${new Date().toString()}`);
}
bootstrap();
