import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { AppointmentViewModel } from "../view-models/appointments-view-model";
import { ListPatientAppointmentsQuery } from "../dtos/list-patient-appointments-query";
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
    @Query() query?: ListPatientAppointmentsQuery,
  ) {
    const { appointments } = await this.listAppointmentsUseCase.execute({
      initDate: new Date(query.initDate),
      endDate: new Date(query.endDate),
    });

    return {
      items: appointments.map(AppointmentViewModel.toHTTP),
    };
  }
}