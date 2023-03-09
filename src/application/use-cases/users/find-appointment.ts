import { Appointment, AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Injectable } from "@nestjs/common";
import { isValid } from "date-fns";

export class FindAppointmentRequest {
  id: string;
}

export class FindAppointmentResponse {
  appointment: Appointment;
}

@Injectable()
export class FindAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async execute(request: FindAppointmentRequest): Promise<FindAppointmentResponse> {
    let { id } = request;
    const appointment = await this.appointmentsRepository.findById(id);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return { appointment }
  }

}