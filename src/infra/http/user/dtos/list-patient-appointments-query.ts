import { IsISO8601 } from "class-validator";

export class ListPatientAppointmentsQuery {
  @IsISO8601()
  initDate: Date;

  @IsISO8601()
  endDate: Date;
}