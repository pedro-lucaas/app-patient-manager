import { Appointment } from "@application/entities/appointment/appointment";

export class AppointmentViewModel {
  static toHTTP(appointment: Appointment): AppointmentViewModel {
    return {
      id: appointment.appointmentId,
      userId: appointment.userId,
      patient: appointment.patient && {
        id: appointment.patient.patientId,
        name: appointment.patient.name,
        email: appointment.patient.email,
        sex: appointment.patient.sex,
        phone: appointment.patient.phone,
        birthDate: appointment.patient.birthDate,
      },
      initDate: appointment.initDate,
      endDate: appointment.endDate,
      procedure: appointment.procedure,
      price: appointment.price,
      paid: appointment.paid,
      status: appointment.status,
      comments: appointment.comments,
      cancelReason: appointment.cancelReason,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      files: appointment.files && appointment.files.map(file => {
        return {
          id: file.id,
          appointmentId: file.appointmentId,
          fileName: file.fileName,
          fileUrl: file.fileUrl,
        }
      })
    }
  }
}