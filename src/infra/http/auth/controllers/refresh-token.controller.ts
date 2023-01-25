import { RefreshToken } from "@application/use-cases/users/refresh-token";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Body, Controller, Post } from "@nestjs/common/decorators";
import { RefreshTokenBody } from "../dtos/refresh-token-body";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('refresh-token')
export class RefreshTokenController {
  constructor(
    private readonly refreshToken: RefreshToken,
  ) { }

  @Post()
  async handle(@Body() body: RefreshTokenBody) {
    const { refreshToken } = body;
    try {
      const result = await this.refreshToken.execute({ refreshToken });

      return result;
    } catch (error) {

      throw new HttpException("Token invalid", HttpStatus.UNAUTHORIZED);
    }
  }
}