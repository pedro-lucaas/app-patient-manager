import { CreateAttributeUseCase } from "@application/use-cases/users/create-attribute";
import { Body, Controller, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { CreateAttributeBody } from "../dtos/create-attribute-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient/:id/attribute')
export class CreateAttributeController {
  constructor(
    private readonly createAttribute: CreateAttributeUseCase,
  ) { }

  @Post()
  async handle(
    @Param("id") id: string,
    @Body() body: CreateAttributeBody) {
    const { name, value } = body;
    try {
      await this.createAttribute.execute({ patientId: id, name, value })
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}