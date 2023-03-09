import { AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentFiles } from "@application/entities/appointment/appointment-files";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { S3Service } from "@application/services/s3-service";
import { Injectable } from "@nestjs/common";

export class UploadImagesRequest {
  appointmentId: string;
  files?: Express.Multer.File[];
}

export class UploadImagesResponse {
  uploadedFiles: AppointmentFiles[];
}

@Injectable()
export class UploadImagesUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly s3Service: S3Service,
  ) { }

  async execute(request: UploadImagesRequest): Promise<UploadImagesResponse> {
    const { appointmentId, files } = request;

    const appointment = await this.appointmentsRepository.findById(appointmentId);

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.status !== AppointmentStatus.STARTED) {
      throw new Error("Appointment is not started");
    }
    let uploadedFiles: AppointmentFiles[] = [];
    if (files) {
      const s3response = await this.s3Service.uploadFiles(files, appointment.appointmentId);
      uploadedFiles = s3response.map((file) => new AppointmentFiles({
        fileName: file.Key,
        fileUrl: file.Location,
        appointmentId: appointment.appointmentId,
      }));
      appointment.files = [...appointment.files, ...uploadedFiles]
    }

    await this.appointmentsRepository.save(appointment);

    return { uploadedFiles }
  }
}