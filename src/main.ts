import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors();

  app.setGlobalPrefix("/api");

  const config = new DocumentBuilder()
    .setTitle("MoneyFast")
    .setDescription("Документация REST API для moneyfast")
    .setVersion("1.0.0")
    .addTag("Harcislo")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
  });
}

start();
