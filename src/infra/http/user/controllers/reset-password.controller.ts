import { ResetPassword } from "@application/use-cases/users/reset-password";
import { Body, Controller, HttpException, HttpStatus, Put, Req, UseGuards } from "@nestjs/common";
import { RegisterUserBody } from "../dtos/reset-password-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reset-password')
export class ResetPasswordController {
  constructor(
    private resetPassword: ResetPassword,
  ) { }

  @Put()
  async handle(
    @Req() req: any,
    @Body() body: RegisterUserBody
  ) {
    const { sub: userId } = req.user;
    const { password, newPassword } = body;
    try {
      await this.resetPassword.execute({
        userId,
        password,
        newPassword
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}