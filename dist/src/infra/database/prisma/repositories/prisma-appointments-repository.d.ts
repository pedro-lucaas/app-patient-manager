import { Appointment } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Pagination } from "@helpers/Pagination";
import { PrismaService } from "../prisma.service";
export declare class PrismaAppointmentsRepository implements AppointmentsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(appointment: Appointment): Promise<void>;
    findByDate(initDate: Date, endDate: Date): Promise<Appointment | null>;
    findById(appointmentId: string): Promise<Appointment | null>;
    findStartedAppointment(): Promise<Appointment>;
    findManyByPatientId(patientId: string, page?: number, limit?: number): Promise<Pagination<Appointment>>;
    findManyByDateInterval(initDate: Date, endDate: Date): Promise<Appointment[]>;
    delete(appointmentId: string): Promise<void>;
    save(appointment: Appointment): Promise<void>;
}
