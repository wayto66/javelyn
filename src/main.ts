import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import express from "express";
import * as fs from "fs";
import https from "https";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./infra/common/filter/all.exception.filter";
import { LoggerService } from "./infra/common/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.on("uncaughtException", (err) => {
    console.error("\x1b[31m%s\x1b[0m", "UNCAUGHT EXCEPTION!");
    console.error("\x1b[31m%s\x1b[0m", err);
  });

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.enableCors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
  });

  const swaggerOptions = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Workflow Manager API")
    .setDescription("Descrição da API do gestor de workflows")
    .setVersion("1.0")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup("api", app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });

  const httpsOptions = {
    key: fs.readFileSync(
      "../../../etc/letsencrypt/live/javelyn.link/privkey.pem",
    ),
    cert: fs.readFileSync(
      "../../../etc/letsencrypt/live/javelyn.link/fullchain.pem",
    ),
  };

  const server = express();

  await https.createServer(httpsOptions, server).listen(4000);
}

bootstrap();
