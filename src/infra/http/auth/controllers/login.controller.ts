import { Login } from "@application/use-cases/users/login";
import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { LoginBody } from "../dtos/login-body";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('login')
export class LoginController {
  constructor(
    private readonly login: Login,
  ) { }

  @Post()
  async handle(@Body() body: LoginBody) {
    const { email, password } = body;
    try {
      const result = await this.login.execute({ email, password });

      return result;
    } catch (error) {

      throw new HttpException("Email or password invalid", HttpStatus.UNAUTHORIZED);
    }
  }
}