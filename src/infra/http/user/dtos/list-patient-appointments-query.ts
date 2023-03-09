import { AppointmentStatus } from "@application/entities/appointment/appointment";
import { Transform } from "class-transformer";
import { IsOptional, IsEnum, IsNumberString, IsNumber } from "class-validator";

export class ListPatientAppointmentsQuery {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}