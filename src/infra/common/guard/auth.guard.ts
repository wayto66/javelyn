import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
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
    const deactivated = true;
    if (deactivated) return true;

    const request = context.switchToHttp().getRequest();
    console.log(request);
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
