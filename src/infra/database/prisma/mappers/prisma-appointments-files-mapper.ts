import { AppointmentFiles } from "@application/entities/appointment/appointment-files";

export class PrismaAppointmentsFilesMapper {
  static toDomain(raw: any): AppointmentFiles {
    if (!raw) {
      return null;
    }
    return new AppointmentFiles({
      id: raw.id,
      appointmentId: raw.appointmentId,
      fileName: raw.fileName,
      fileUrl: raw.fileUrl,
    });
  }

  static toPrisma(appointmentFiles: AppointmentFiles) {
    return {
      id: appointmentFiles.id,
      appointmentId: appointmentFiles.appointmentId,
      fileName: appointmentFiles.fileName,
      fileUrl: appointmentFiles.fileUrl
    };
  }
}