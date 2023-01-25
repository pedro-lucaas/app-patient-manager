import { Controller, Get, UseGuards } from "@nestjs/common";
import { ListAttributesUseCase } from "@application/use-cases/users/list-attributes";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { AttributeViewModel } from "../view-models/attributes-view-model";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attributes')
export class ListAttributesController {
  constructor(
    private listAttributes: ListAttributesUseCase,
  ) { }

  @Get()
  async handle() {
    const { attributes } = await this.listAttributes.execute();

    return {
      items: attributes.map(AttributeViewModel.toHTTP),
    };
  }
}