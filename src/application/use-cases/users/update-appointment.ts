import { AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentFiles } from "@application/entities/appointment/appointment-files";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { S3Service } from "@application/services/s3-service";
import { Injectable } from "@nestjs/common";
import { isBefore } from "date-fns";

export class UpdateAppointmentRequest {
  appointmentId: string;
  procedure?: string;
  price?: number;
  paid?: boolean;
  initDate?: Date;
  endDate?: Date;
  comments?: string;
  cancelReason?: string;
  files?: Express.Multer.File[];
}

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly s3Service: S3Service,
  ) { }

  async update(request: UpdateAppointmentRequest): Promise<void> {
    const { appointmentId, comments, files, initDate, endDate, price, procedure, paid } = request;
    const appointment = await this.appointmentsRepository.findById(appointmentId);
    if (isBefore(initDate, new Date()) || isBefore(endDate, new Date())) {
      throw new Error("Date must be in the future");
    }
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (!!initDate && !!endDate) appointment.setDates(initDate, endDate);
    const appointmentWithSameDate = await this.appointmentsRepository.findMany(undefined, appointment.initDate, appointment.endDate);
    if (appointmentWithSameDate.length > 1 || !appointmentWithSameDate.filter((a) => a.appointmentId === appointment.appointmentId).length) {
      throw new Error("Appointment in this time already scheduled");
    }

    appointment.procedure = procedure ?? appointment.procedure;
    appointment.price = price ?? appointment.price;
    appointment.paid = paid ?? appointment.paid;
    appointment.comments = comments;
    appointment.files = [];
    if (files) {
      const s3response = await this.s3Service.uploadFiles(files, appointment.appointmentId);
      appointment.files = s3response.map((file) => new AppointmentFiles({
        fileName: file.Key,
        fileUrl: file.Location,
        appointmentId: appointment.appointmentId,
      }));
    }

    await this.appointmentsRepository.save(appointment);
  }

  async start(request: UpdateAppointmentRequest): Promise<void> {
    const { appointmentId } = request;
    const startedAppointment = await this.appointmentsRepository.findStartedAppointment();
    if (startedAppointment) {
      throw new Error("Appointment already started");
    }
    const appointment = await this.appointmentsRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new Error("Appointment already started or finished");
    }
    appointment.start();

    await this.appointmentsRepository.save(appointment);
  }

  async finish(request: UpdateAppointmentRequest): Promise<void> {
    const { appointmentId } = request;
    const appointment = await this.appointmentsRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (appointment.status !== AppointmentStatus.STARTED) {
      throw new Error("Appointment not started");
    }
    appointment.finish();

    await this.appointmentsRepository.save(appointment);
  }

  async cancel(request: UpdateAppointmentRequest): Promise<void> {
    const { appointmentId, cancelReason } = request;
    const appointment = await this.appointmentsRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    if (appointment.status !== AppointmentStatus.SCHEDULED) {
      throw new Error("Appointment already started or finished");
    }

    appointment.cancel(cancelReason);

    await this.appointmentsRepository.save(appointment);
  }

}