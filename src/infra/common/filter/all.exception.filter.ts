import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { GqlArgumentsHost } from "@nestjs/graphql";
import { Request } from "express";
import { keyToDisplayName } from "src/helpers/keyToDisplayName";
import { LoggerService } from "../logger/logger.service";

interface IError {
  message: string;
  error: boolean;
  statusCode: number;
  errorCode: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  private handlerMap = new Map<string, (exception: any) => IError>([
    ["P2002", this.UniqueConstraintFailedErrorHandler],
  ]);

  catch(exception: any, host: ArgumentsHost) {
    if (exception.code === "ERR_HTTP_HEADERS_SENT") return;

    const gqlHost = GqlArgumentsHost.create(host);
    const newhost = gqlHost.switchToHttp();
    const ctx = gqlHost.getContext();
    const req = newhost.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const handler = this.handlerMap.get(exception.code);

    if (handler) {
      const { error, errorCode, message, statusCode } = handler(exception);
      return ctx.req.res.status(statusCode).json({
        data: { error, errorCode, message },
      });
    }

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : {
            message: (exception as Error).message,
            error: true,
            statusCode: 500,
            errorCode: "?",
          };

    this.logMessage(req, message, status, exception);

    // res.status(status).json(responseData);
  }

  private logMessage(
    request: Request | undefined,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.loggerService.error(
        `End Request for ${request?.path}`,
        `method=${request?.method} status=${status} code_error=${
          message.errorCode ? message.errorCode : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : "",
      );
    } else {
      this.loggerService.warn(
        `End Request for ${request?.path}`,
        `method=${request?.method} status=${status} code_error=${
          message.errorCode ? message.errorCode : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }

  private UniqueConstraintFailedErrorHandler(exception: any) {
    console.log(exception.code);
    console.log(exception.meta);
    const { modelName, target: targets } = exception.meta;
    const targetsDisplay = targets
      .map((tg: string) => keyToDisplayName(tg))
      .filter((tg) => tg?.length > 0)
      .join(", ");
    const displayModelName = keyToDisplayName(modelName);
    const message = `Já existe um ${displayModelName} cadastrado com os campos fornecidos. Verifique: ${targetsDisplay}`;
    const errorCode = "P2002";
    const statusCode = 200;

    return {
      message,
      errorCode,
      statusCode,
      error: true,
    };
  }
}
