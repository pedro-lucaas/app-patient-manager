import { ListPatientAppointmentsUseCase } from "@application/use-cases/users/list-patient-appointments";
import { Controller, Get, HttpException, HttpStatus, Param, Query, UseGuards } from "@nestjs/common";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";
import { AppointmentViewModel } from "../view-models/appointments-view-model";
import { ParseIntPipe } from "@infra/utils/pipes/parse-int.pipe";
import { IsEnum } from "class-validator";
import { AppointmentStatus } from "@application/entities/appointment/appointment";
import { query } from "express";
import { ListPatientAppointmentsQuery } from "../dtos/list-patient-appointments-query";

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
    @Query() query: ListPatientAppointmentsQuery,
  ) {
    const { page, limit, status } = query;
    try {
      const { appointments } = await this.listPatientAppointmentsUseCase.execute({
        patientId,
        page: page && parseInt(page),
        limit: limit && parseInt(limit),
        status,
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