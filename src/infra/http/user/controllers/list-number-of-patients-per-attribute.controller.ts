import { ListNumberOfPatientsPerAttributeUseCase } from "@application/use-cases/users/list-number-of-patients-per-attributes";
import { Controller, Get, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pie-chart')
export class ListNumberOfPatientsPerAttributeController {
  constructor(
    private readonly listNumberOfPatientsPerAttribute: ListNumberOfPatientsPerAttributeUseCase,
  ) { }

  @Get()
  async handle() {
    try {
      const { result } = await this.listNumberOfPatientsPerAttribute.execute()
      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}