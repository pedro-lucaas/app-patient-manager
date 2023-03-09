import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Injectable } from "@nestjs/common";

export class DeleteAppointmentUseCaseRequest {
  appointmentId: string;
}

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async execute(request: DeleteAppointmentUseCaseRequest): Promise<void> {
    const { appointmentId } = request;

    const appointment = await this.appointmentsRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    await this.appointmentsRepository.delete(appointmentId);
  }
}