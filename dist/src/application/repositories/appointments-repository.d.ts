import { Appointment, AppointmentStatus } from "@application/entities/appointment/appointment";
import { Pagination } from "@helpers/Pagination";
export declare abstract class AppointmentsRepository {
    abstract create(appointment: Appointment): Promise<void>;
    abstract findByDate(initDate: Date, endDate: Date): Promise<Appointment | null>;
    abstract findById(appointmentId: string): Promise<Appointment | null>;
    abstract findStartedAppointment(): Promise<Appointment | null>;
    abstract findManyByPatientId(patientId: string, page?: number, limit?: number): Promise<Pagination<Appointment>>;
    abstract findMany(status?: AppointmentStatus, initDate?: Date, endDate?: Date): Promise<Appointment[]>;
    abstract delete(appointmentId: string): Promise<void>;
    abstract save(appointment: Appointment): Promise<void>;
}
