import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { Login } from "@application/use-cases/users/login";
import { LoginController } from "./controllers/login.controller";
import { RefreshToken } from "@application/use-cases/users/refresh-token";
import { RefreshTokenController } from "./controllers/refresh-token.controller";
import { JwtModule } from "@nestjs/jwt";
import { jwtOptions } from "@config/config";
import { JwtStrategy } from "./jwt/jwt.strategy";


@Module({
  imports: [
    DatabaseModule,
    JwtModule.register(jwtOptions),
  ],
  controllers: [
    LoginController,
    RefreshTokenController
  ],
  providers: [
    JwtStrategy,
    Login,
    RefreshToken,
  ],
})

export class AuthModule { }