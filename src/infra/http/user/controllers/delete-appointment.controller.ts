import { DeleteAppointmentUseCase } from "@application/use-cases/users/delete-appointment";
import { Controller, Delete, HttpException, HttpStatus, Param, Put, UseGuards } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointment/:id')
export class DeleteAppointmentController {
  constructor(
    private readonly deleteAppointment: DeleteAppointmentUseCase,
  ) { }

  @Delete()
  async handle(
    @Param('id') appointmentId: string,
  ) {
    try {
      await this.deleteAppointment.execute({
        appointmentId,
      });
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
