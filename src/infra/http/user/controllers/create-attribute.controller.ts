import { CreateAttributeUseCase } from "@application/use-cases/users/create-attribute";
import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { CreateAttributeBody } from "../dtos/create-attribute-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attribute')
export class CreateAttributeController {
  constructor(
    private readonly createAttribute: CreateAttributeUseCase,
  ) { }

  @Post()
  async handle(@Body() body: CreateAttributeBody) {
    const { name } = body;
    try {
      await this.createAttribute.execute({ name })
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}