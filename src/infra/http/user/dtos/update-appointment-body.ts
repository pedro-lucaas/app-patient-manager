import { IsISO8601, IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

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
  paid: boolean;

  @IsOptional()
  @IsISO8601()
  initDate: string;

  @IsOptional()
  @IsISO8601()
  endDate: string;

}