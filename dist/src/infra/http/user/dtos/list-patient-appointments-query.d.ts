import { AppointmentStatus } from "@application/entities/appointment/appointment";
export declare class ListPatientAppointmentsQuery {
    initDate?: Date;
    endDate?: Date;
    status?: AppointmentStatus;
}
