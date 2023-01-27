import { ListPatientAppointmentsUseCase } from "@application/use-cases/users/list-patient-appointments";
import { Controller, Get, HttpException, HttpStatus, Param, Query, UseGuards } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { AppointmentViewModel } from "../view-models/appointments-view-model";
import { ParseIntPipe } from "@infra/utils/pipes/parse-int.pipe";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('patient/:id/appointments')
export class ListPatientAppointmentsController {
  constructor(
    private readonly listPatientAppointmentsUseCase: ListPatientAppointmentsUseCase,
  ) { }

  @Get()
  async handle(
    @Param('id') patientId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    try {
      const { appointments } = await this.listPatientAppointmentsUseCase.execute({
        patientId,
        page,
        limit,
      });

      return {
        ...appointments,
        items: appointments.items.map(AppointmentViewModel.toHTTP),
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}