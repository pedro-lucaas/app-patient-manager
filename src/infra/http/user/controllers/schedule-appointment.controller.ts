import { ScheduleAppointmentsUseCase } from "@application/use-cases/users/schedule-appointment";
import { Body, Controller, HttpException, HttpStatus, ParseIntPipe, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { ScheduleAppointmentBody } from "../dtos/schedule-appointment-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { Req } from "@nestjs/common/decorators";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/appointment')
export class ScheduleAppointmentsController {
  constructor(
    private readonly scheduleAppointmentsUseCase: ScheduleAppointmentsUseCase,
  ) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async handle(
    @Body() body: ScheduleAppointmentBody,
    @Req() req: any,
    @UploadedFiles() files?: Array<Express.Multer.File>,
  ) {
    const { patientId, initDate, endDate, price, procedure, paid } = body;
    const userId = req.user.sub;
    try {
      await this.scheduleAppointmentsUseCase.execute({
        patientId,
        userId,
        price,
        procedure,
        paid,
        initDate: new Date(initDate),
        endDate: new Date(endDate),
        files,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}