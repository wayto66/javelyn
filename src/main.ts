import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./infra/common/filter/all.exception.filter";
import { LoggerService } from "./infra/common/logger/logger.service";

async function bootstrap() {
  const keyPath = "../../../etc/letsencrypt/live/javelyn.link/privkey.pem";
  const certPath = "../../../etc/letsencrypt/live/javelyn.link/fullchain.pem";

  let httpsOptions;

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  } else {
    console.log(
      "Arquivos de chave ou certificado não encontrados. HTTPS não será configurado.",
    );
  }
  const app =
    process.env.ENVIRONMENT === "dev"
      ? await NestFactory.create(AppModule)
      : await NestFactory.create(AppModule, { httpsOptions });

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

  await app.listen(4000);
}

bootstrap();
