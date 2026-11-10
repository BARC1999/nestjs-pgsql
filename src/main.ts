import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port');
  }

  const app = await NestFactory.create(AppModule);
  // The portfolio exposes only public data; Sandbox may run on a different origin.
  app.enableCors({ origin: true });
  app.enableShutdownHooks();
  await app.listen(port, '0.0.0.0');
  console.log(`Apollo Sandbox: http://localhost:${port}/graphql`);
}

void bootstrap();
