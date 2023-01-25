import { IsNotEmpty } from "class-validator";

export class CancelAppointmentBody {
  @IsNotEmpty()
  cancelReason: string;
}

export class UpdateAppointmentBody {
  @IsNotEmpty()
  comments: string;
}