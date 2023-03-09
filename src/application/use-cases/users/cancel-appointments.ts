import { Appointment } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Injectable } from "@nestjs/common";

export class CancelAppointmentUseCaseRequest {
  appointmentId: string;
  cancelReason: string;
}

@Injectable()
export class CancelAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async execute(request: CancelAppointmentUseCaseRequest): Promise<void> {
    const { appointmentId, cancelReason } = request;

    const OldAppointment = await this.appointmentsRepository.findById(appointmentId);
    if (!OldAppointment) {
      throw new Error("Appointment not found");
    }

    OldAppointment.cancel(cancelReason);

    await this.appointmentsRepository.save(OldAppointment);
  }
}