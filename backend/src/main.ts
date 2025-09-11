import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Настройка trust proxy для корректного получения IP адресов
  app.getHttpAdapter().getInstance().set("trust proxy", true);

  // Настройка хостинга статических файлов
  app.useStaticAssets(join(__dirname, "..", "uploads"), {
    prefix: "/static/",
  });

  // Глобальные пайпы
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Парсер куки
  app.use(cookieParser());

  // CORS
  app.enableCors({
    origin: ['http://146.103.122.171'],
    credentials: true,
  });
  app.setGlobalPrefix("api");
  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle("E-Commerce API")
    .setDescription("API для электронной коммерции")
    .setVersion("1.0")
    .addTag("auth")
    .addTag("users")
    .addTag("products")
    .addTag("orders")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Запуск сервера
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Приложение запущено на порту ${port}`);
  console.log(
    `Статические файлы доступны по адресу http://localhost:${port}/static/`,
  );
}

void bootstrap().catch((error) => {
  console.error("Ошибка при запуске приложения:", error);
  process.exit(1);
});
