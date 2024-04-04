import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "prisma/prisma.module";
import { ExceptionModule } from "src/infra/common/exception/exception.module";
import { EncryptModule } from "../../handlers/encrypt/encrypt.module";
import { UserModule } from "../user/user.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
    UserModule,
    PrismaModule,
    EncryptModule,
    ExceptionModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
