import { Appointment, AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Injectable } from "@nestjs/common";
import { isValid } from "date-fns";

export class ListAppointmentsRequest {
  initDate?: Date;
  endDate?: Date;
  status?: AppointmentStatus;
}

export class ListAppointmentsResponse {
  appointments: Array<Appointment>;
}

@Injectable()
export class ListAppointmentsUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async execute(request: ListAppointmentsRequest): Promise<ListAppointmentsResponse> {
    const { status, initDate, endDate } = request;

    const appointments = await this.appointmentsRepository.findMany(status, isValid(initDate) ? initDate : undefined, isValid(endDate) ? endDate : undefined);

    return { appointments }
  }

}