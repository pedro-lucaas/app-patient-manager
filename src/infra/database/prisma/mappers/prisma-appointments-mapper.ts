import { Appointment } from "@application/entities/appointment/appointment";
import { AppointmentFiles } from "@application/entities/appointment/appointment-files";
import { PrismaAppointmentsFilesMapper } from "./prisma-appointments-files-mapper";
import { PrismaPatientsMapper } from "./prisma-patients-mapper";

export class PrismaAppointmentsMapper {
  static toPrisma(appointment: Appointment) {
    return {
      id: appointment.appointmentId,
      userId: appointment.userId,
      patientId: appointment.patientId,
      initDate: appointment.initDate,
      endDate: appointment.endDate ?? null,
      procedure: appointment.procedure,
      price: appointment.price,
      paid: appointment.paid,
      status: appointment.status,
      comments: appointment.comments,
      cancelReason: appointment.cancelReason,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };
  }

  static toDomain(raw: any) {
    if (!raw) {
      return null;
    }
    return new Appointment({
      userId: raw.userId,
      procedure: raw.procedure,
      price: raw.price,
      paid: raw.paid,
      status: raw.status,
      initDate: raw.initDate,
      endDate: raw.endDate,
      comments: raw.comments,
      cancelReason: raw.cancelReason,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      patientId: raw.patientId,
      patient: raw.patient && PrismaPatientsMapper.toDomain(raw.patient),
      files: raw.AppointmentsFiles && raw.AppointmentsFiles.map(PrismaAppointmentsFilesMapper.toDomain),
    }, raw.id);
  }
}