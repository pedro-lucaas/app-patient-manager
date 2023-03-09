import { AppointmentStatus, ConfirmedBy } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Injectable } from "@nestjs/common";
import { addHours, isBefore } from "date-fns";

export class UpdateAppointmentRequest {
  appointmentId: string;
  procedure?: string;
  price?: number;
  confirmedBy?: ConfirmedBy;
  paid?: boolean;
  initDate?: Date;
  endDate?: Date;
  medicalRecord?: string;
  comments?: string;
  cancelReason?: string;
  status?: AppointmentStatus;
}

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) { }

  async update(request: UpdateAppointmentRequest): Promise<void> {
    const { appointmentId, comments, initDate, endDate, price, procedure, paid, status, confirmedBy, cancelReason } = request;

    if (isBefore(initDate, new Date()) || isBefore(endDate, new Date())) {
      throw new Error("Date must be in the future");
    }

    const appointment = await this.appointmentsRepository.findById(appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (status) {
      if (status === AppointmentStatus.STARTED) {
        if (appointment.status !== AppointmentStatus.SCHEDULED) {
          throw new Error("Não é possível iniciar uma consulta que não está agendada");
        }
        const appointmentsStarteds = await this.appointmentsRepository.findMany(AppointmentStatus.STARTED);
        if (appointmentsStarteds.length > 0) {
          throw new Error("Outra consulta está em andamento");
        }
        appointment.setDates(new Date(), addHours(new Date(), 1));
      } else if (status === AppointmentStatus.FINISHED) {
        if (appointment.status !== AppointmentStatus.STARTED) {
          throw new Error("Não é possível finalizar uma consulta que não foi iniciada");
        }
        appointment.setDates(appointment.initDate, new Date());
      } else if (status === AppointmentStatus.CANCELED) {
        if (appointment.status === AppointmentStatus.CANCELED) {
          throw new Error("Consulta já foi cancelada");
        }
        appointment.cancelReason = cancelReason ?? appointment.cancelReason;
      } else if (status === AppointmentStatus.SCHEDULED) {
        if (!!initDate && !!endDate) appointment.setDates(initDate, endDate);
        const appointmentWithSameDate = await this.appointmentsRepository.findMany(undefined, appointment.initDate, appointment.endDate);
        if (appointmentWithSameDate.length > 1 || !!appointmentWithSameDate.filter((a) => a.appointmentId === appointment.appointmentId).length) {
          throw new Error("Outra consulta já agendada para este horário");
        }
      }
    }

    appointment.status === AppointmentStatus.STARTED && request.medicalRecord && (appointment.medicalRecord = request.medicalRecord);
    appointment.procedure = procedure ?? appointment.procedure;
    appointment.price = price ?? appointment.price;
    appointment.paid = paid ?? appointment.paid;
    appointment.comments = comments;
    appointment.confirmedBy = confirmedBy ?? appointment.confirmedBy;
    appointment.status = status ?? appointment.status;

    await this.appointmentsRepository.save(appointment);
  }
}