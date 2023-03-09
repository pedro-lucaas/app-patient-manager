import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { AppointmentViewModel } from "../view-models/appointments-view-model";
import { ListAppointmentsQuery } from "../dtos/list-appointments-query";
import { ListAppointmentsUseCase } from "@application/use-cases/users/list-appointments";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointments')
export class ListAppointmentsController {
  constructor(
    private readonly listAppointmentsUseCase: ListAppointmentsUseCase,
  ) { }

  @Get()
  async handle(
    @Query() query?: ListAppointmentsQuery,
  ) {

    const { appointments } = await this.listAppointmentsUseCase.execute({
      initDate: query.initDate,
      endDate: query.endDate,
      status: query.status,
    });

    return {
      items: appointments.map(AppointmentViewModel.toHTTP),
    };
  }
}