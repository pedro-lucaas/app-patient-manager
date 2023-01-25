import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ParseIntPipe } from "@infra/utils/pipes/parse-int.pipe";
import { ListPatientsUseCase } from "@application/use-cases/users/list-patients";
import { PatientViewModel } from "../view-models/patient-view-model";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patients')
export class ListPatientsController {
  constructor(
    private listPatients: ListPatientsUseCase,
  ) { }

  @Get()
  async handle(
    @Query('page', ParseIntPipe) page: number,
    @Query('search') search: string,
    @Query('attribute') attribute: string,
    @Query('sex') sex: string,
  ) {

    const { patients } = await this.listPatients.execute({ page, search, attribute, sex });

    return {
      ...patients,
      items: patients.items.map(PatientViewModel.toHTTP),
    };
  } s
}