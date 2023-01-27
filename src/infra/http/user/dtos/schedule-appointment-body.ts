import { IsISO8601, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class ScheduleAppointmentBody {
  @IsNotEmpty()
  patientId: string;

  @IsNotEmpty()
  procedure: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  paid: boolean;

  @IsISO8601()
  initDate: string;

  @IsISO8601()
  endDate: string;

}