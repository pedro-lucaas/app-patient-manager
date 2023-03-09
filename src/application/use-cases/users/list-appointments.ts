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
    let { status, initDate, endDate } = request;
    if (status && !Object.values(AppointmentStatus).includes(status)) {
      throw new Error("Invalid status");
    }
    initDate = new Date(initDate)
    if (!isValid(initDate)) {
      initDate = undefined;
    }
    endDate = new Date(endDate)
    if (!isValid(endDate)) {
      endDate = undefined;
    }
    const appointments = await this.appointmentsRepository.findMany(status, initDate, endDate);

    return { appointments }
  }

}