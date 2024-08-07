import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
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
    methods: "GET,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "*",
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
