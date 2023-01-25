import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CancelPatientBody {
  @IsNotEmpty()
  patientId: string;
}