import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";
import { Request, request } from "express";
import { UserService } from "src/modules/user/user.service";
import { ExceptionService } from "../exception/exception.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly exceptionService: ExceptionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const body = req.body;
    if (!body) throw new UnauthorizedException("No Data found");

    const signature = req.headers["x-hmac-signature"];
    const operation = body.query ?? body.mutation;

    const operationString = JSON.stringify(operation)
      .replace(/\\n/g, "") // Remove \n (novas linhas)
      .replace(/\\t/g, "") // Remove \t (tabulações)
      .replace(/\s+/g, "") // Remove todos os espaços em branco
      .replace(/,/g, "")
      .replaceAll("__typename", "");

    const secret = process.env.HMAC_SECRET;

    if (!signature) {
      throw new UnauthorizedException("No HMAC signature found");
    }

    const hash = crypto
      .createHmac("sha256", secret)
      .update(operationString)
      .digest("hex");

    if (hash !== signature) {
      throw new UnauthorizedException("Invalid HMAC signature");
    }

    const deactivated = true;
    if (deactivated) return true;

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.exceptionService.unauthorizedException({
        message: "Token não encontrado",
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findOne(payload.sub);

      request["user"] = user;
    } catch {
      this.exceptionService.unauthorizedException({
        message: "Token inválido",
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log(request);
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
