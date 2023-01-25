import { CancelAppointmentUseCase } from "@application/use-cases/users/cancel-appointments";
import { ScheduleAppointmentsUseCase } from "@application/use-cases/users/schedule-appointment";
import { UpdateAppointmentUseCase } from "@application/use-cases/users/update-appointment";
import { Body, Controller, HttpException, HttpStatus, Param, Put, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { UpdateAppointmentBody, CancelAppointmentBody } from "../dtos/update-appointment-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('appointment/:id')
export class UpdateAppointmentController {
  constructor(
    private readonly updateAppointment: UpdateAppointmentUseCase,
  ) { }

  @Put()
  @UseInterceptors(AnyFilesInterceptor())
  async update(
    @Param('id') appointmentId: string,
    @Body() body: UpdateAppointmentBody,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { comments } = body;
    try {
      await this.updateAppointment.update({
        appointmentId,
        comments,
        files,
      });
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('cancel')
  async cancel(@Param('id') appointmentId: string, @Body() body: CancelAppointmentBody) {
    const { cancelReason } = body;
    try {

      await this.updateAppointment.cancel({
        appointmentId,
        cancelReason,
      });
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('start')
  async start(@Param('id') appointmentId: string) {
    try {

      await this.updateAppointment.start({
        appointmentId,
      });
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('finish')
  async finish(@Param('id') appointmentId: string) {
    try {

      await this.updateAppointment.finish({
        appointmentId,
      });
    } catch (e) {

      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
