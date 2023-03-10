import { DeleteAttributeUseCase } from "@application/use-cases/users/delete-attribute";
import { Body, Controller, HttpException, HttpStatus, Delete, UseGuards, Param } from "@nestjs/common";
import { DeleteAttributeBody } from "../dtos/delete-attribute-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient/:id/attribute/:name')
export class DeleteAttributeController {
  constructor(
    private readonly deleteAttribute: DeleteAttributeUseCase,
  ) { }

  @Delete()
  async handle(
    @Param("id") id: string,
    @Param("name") name: string
  ) {
    try {
      await this.deleteAttribute.execute({
        patientId: id,
        name,
      })
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}