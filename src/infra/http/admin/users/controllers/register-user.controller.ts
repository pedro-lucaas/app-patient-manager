import { RegisterUser } from '@application/use-cases/admin/register-user';
import { Controller, Post, Body, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { RegisterUserBody } from '../dtos/register-user-body';
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('register')
export class RegisterUserController {
  constructor(
    private registerUser: RegisterUser,
  ) { }

  @Post()
  async handle(@Body() request: RegisterUserBody): Promise<void> {
    try {
      await this.registerUser.execute(request);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}