import { AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Injectable } from "@nestjs/common";

export class DeleteImageRequest {
  appointmentId: string;
  imageId: number;
}

@Injectable()
export class DeleteImageUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async execute(request: DeleteImageRequest): Promise<void> {
    const { appointmentId, imageId } = request;

    if (isNaN(imageId)) {
      throw new Error("Image id is not a number");
    }
    const appointment = await this.appointmentsRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.status !== AppointmentStatus.STARTED) {
      throw new Error("Appointment is not started");
    }

    if (appointment.files) {
      const imageIndex = appointment.files.findIndex((file) => file.id === imageId);
      if (imageIndex === -1) {
        throw new Error("Image not found");
      }
      appointment.files.splice(imageIndex, 1);
    }
    await this.appointmentsRepository.save(appointment);

  }
}