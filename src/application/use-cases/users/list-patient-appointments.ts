import { Appointment, AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";

export class ListPatientAppointmentsRequest {
  patientId: string;
  page?: number;
  limit?: number;
  status?: AppointmentStatus;
}

export class ListPatientAppointmentsResponse {
  appointments: Pagination<Appointment>;
}

@Injectable()
export class ListPatientAppointmentsUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async execute(request: ListPatientAppointmentsRequest): Promise<ListPatientAppointmentsResponse> {
    const { patientId, page, limit, status } = request;

    const appointments = await this.appointmentsRepository.findManyByPatientId(patientId, page, limit, status);

    return { appointments }
  }
}