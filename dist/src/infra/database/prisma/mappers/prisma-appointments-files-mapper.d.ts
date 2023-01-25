import { AppointmentFiles } from "@application/entities/appointment/appointment-files";
export declare class PrismaAppointmentsFilesMapper {
    static toDomain(raw: any): AppointmentFiles;
    static toPrisma(appointmentFiles: AppointmentFiles): {
        id: number;
        appointmentId: string;
        fileName: string;
        fileUrl: string;
    };
}
