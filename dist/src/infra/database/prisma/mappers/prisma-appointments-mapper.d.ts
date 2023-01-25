import { Appointment } from "@application/entities/appointment/appointment";
export declare class PrismaAppointmentsMapper {
    static toPrisma(appointment: Appointment): {
        id: string;
        userId: string;
        patientId: string;
        initDate: Date;
        endDate: Date;
        procedure: string;
        price: number;
        paid: boolean;
        status: import("@application/entities/appointment/appointment").AppointmentStatus;
        comments: string;
        cancelReason: string;
        createdAt: Date;
        updatedAt: Date;
    };
    static toDomain(raw: any): Appointment;
}
