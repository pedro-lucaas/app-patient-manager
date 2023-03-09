import { AppointmentStatus, ConfirmedBy } from "@application/entities/appointment/appointment";
import { IsEnum, IsISO8601, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class CancelAppointmentBody {
  @IsNotEmpty()
  cancelReason: string;
}

export class UpdateAppointmentBody {
  @IsOptional()
  comments: string;

  @IsOptional()
  procedure: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  medicalRecord: string;

  @IsOptional()
  @IsEnum(ConfirmedBy)
  confirmedBy: ConfirmedBy;

  @IsOptional()
  paid: boolean;

  @IsOptional()
  @IsISO8601()
  initDate: string;

  @IsOptional()
  @IsISO8601()
  endDate: string;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsOptional()
  cancelReason: string;
}