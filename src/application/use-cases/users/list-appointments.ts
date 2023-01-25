import { Appointment } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Injectable } from "@nestjs/common";

export class ListAppointmentsRequest {
  initDate: Date;
  endDate: Date;
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
    const { initDate, endDate } = request;

    const appointments = await this.appointmentsRepository.findManyByDateInterval(initDate, endDate);

    return { appointments }
  }
}