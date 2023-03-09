import { Controller, Get, HttpException, UseGuards } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { Param } from "@nestjs/common/decorators";
import { FindAppointmentUseCase } from "@application/use-cases/users/find-appointment";
import { AppointmentViewModel } from "../view-models/appointments-view-model";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointment/:id')
export class FindAppointmentController {
  constructor(
    private readonly findAppointment: FindAppointmentUseCase,
  ) { }

  @Get()
  async handle(
    @Param('id') id?: string,
  ) {
    try {
      const { appointment } = await this.findAppointment.execute({ id });

      return AppointmentViewModel.toHTTP(appointment);
    } catch (error) {
      throw new HttpException("Appointment not found", 404);
    }
  }
}