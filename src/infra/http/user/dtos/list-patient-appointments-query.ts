import { AppointmentStatus } from "@application/entities/appointment/appointment";
import { IsISO8601, IsOptional, IsEnum } from "class-validator";

export class ListPatientAppointmentsQuery {
  @IsOptional()
  @IsISO8601()
  initDate?: Date;

  @IsOptional()
  @IsISO8601()
  endDate?: Date;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}