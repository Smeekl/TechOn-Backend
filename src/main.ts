import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port: number = parseInt(`${process.env.PORT}`) || 3002;
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
