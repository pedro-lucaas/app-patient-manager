import { Appointment, AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentFiles } from "@application/entities/appointment/appointment-files";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { S3Service } from "@application/services/s3-service";
import { Injectable } from "@nestjs/common";
import { isBefore } from "date-fns";

export class ScheduleAppointmentsUseCaseRequest {
  patientId: string;
  userId: string;
  procedure: string;
  price: number;
  paid?: boolean;
  initDate: Date;
  endDate: Date;
  comments?: string;
  files?: Express.Multer.File[];
}

@Injectable()
export class ScheduleAppointmentsUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly s3Service: S3Service,
  ) { }

  async execute(request: ScheduleAppointmentsUseCaseRequest): Promise<void> {
    const { patientId, initDate, endDate, comments, files, userId, price, procedure, paid } = request;

    if (isBefore(initDate, new Date()) || isBefore(endDate, new Date())) {
      throw new Error("Date must be in the future");
    }

    const patient = await this.patientsRepository.findById(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }

    const appointmentWithSameDate = await this.appointmentsRepository.findMany(AppointmentStatus.SCHEDULED, initDate, endDate);
    if (appointmentWithSameDate.length > 0) {
      throw new Error("Appointment in this time already scheduled");
    }

    const appointment = new Appointment({
      userId,
      price,
      procedure,
      paid,
      patientId,
      initDate: initDate,
      endDate: endDate,
      comments,
      files: [],
    });
    if (files) {
      const s3response = await this.s3Service.uploadFiles(files, appointment.appointmentId);
      appointment.files = s3response.map((file) => new AppointmentFiles({
        fileName: file.Key,
        fileUrl: file.Location,
        appointmentId: appointment.appointmentId,
      }));
    }

    await this.appointmentsRepository.create(appointment);
  }
}