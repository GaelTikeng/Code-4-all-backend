import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const PORT = "3001"
  const environment = process.env.NODE_ENV || "Development"
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT, async () => {
    console.log(
      `Server up and running on ${environment} mode on ${environment === "production" ? process.env.PROD_API_UR : process.env.LOCAL_API_URL}`
    )
  });
}
bootstrap();
