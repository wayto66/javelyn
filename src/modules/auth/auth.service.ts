import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { AuthResponse, SignInInput } from "src/graphql";
import { ExceptionService } from "src/infra/common/exception/exception.service";
import { EncryptService } from "../../handlers/encrypt/encrypt.service";

@Injectable()
export class AuthService {
  private readonly issuer = "sign-in";
  private readonly audience = "users";

  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptService: EncryptService,
    private readonly exceptionService: ExceptionService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: User) {
    return {
      access_token: this.jwtService.sign(
        {
          id: user.id,
          companyId: user.companyId,
          username: user.username,
          name: user.name,
          permissions: user.permissions,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: "1d",
          subject: user.id.toString(),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
      id: user.id,
      companyId: user.companyId,
      name: user.name,
      username: user.username,
      permissions: user.permissions,
    };
  }

  checkToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
      issuer: this.issuer,
      audience: this.audience,
    });
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch {
      return false;
    }
  }

  async signIn(singInInput: SignInInput): Promise<AuthResponse> {
    const userExists = await this.prismaService.user.findFirst({
      where: {
        username: singInInput.username,
        password:
          singInInput.password ??
          this.encryptService.sha256(singInInput.password),
      },
    });

    if (!userExists) {
      return {
        permissions: {},
        isAuthenticated: false,
      };
    }

    const token = this.createToken(userExists);
    return {
      ...token,
      isAuthenticated: true,
    };
  }
}
