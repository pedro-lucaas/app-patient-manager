import { UpdateAppointmentUseCase } from "@application/use-cases/users/update-appointment";
import { Body, Controller, HttpException, HttpStatus, Param, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { UpdateAppointmentBody } from "../dtos/update-appointment-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { AppointmentStatus } from "@application/entities/appointment/appointment";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointment/:id')
export class UpdateAppointmentController {
  constructor(
    private readonly updateAppointment: UpdateAppointmentUseCase,
  ) { }

  @Put()
  @UseInterceptors(AnyFilesInterceptor())
  async handle(
    @Param('id') appointmentId: string,
    @Body() body: UpdateAppointmentBody,
  ) {
    const { comments, initDate, endDate, price, procedure, paid, status, medicalRecord, confirmedBy, cancelReason } = body;

    try {
      await this.updateAppointment.update({
        appointmentId,
        initDate: initDate ? new Date(initDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        price,
        procedure,
        confirmedBy,
        cancelReason,
        paid,
        medicalRecord,
        comments,
        status: status as AppointmentStatus,
      });
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
