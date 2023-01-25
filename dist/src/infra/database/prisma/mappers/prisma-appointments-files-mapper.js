"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAppointmentsFilesMapper = void 0;
const appointment_files_1 = require("../../../../application/entities/appointment/appointment-files");
class PrismaAppointmentsFilesMapper {
    static toDomain(raw) {
        if (!raw) {
            return null;
        }
        return new appointment_files_1.AppointmentFiles({
            id: raw.id,
            appointmentId: raw.appointmentId,
            fileName: raw.fileName,
            fileUrl: raw.fileUrl,
        });
    }
    static toPrisma(appointmentFiles) {
        return {
            id: appointmentFiles.id,
            appointmentId: appointmentFiles.appointmentId,
            fileName: appointmentFiles.fileName,
            fileUrl: appointmentFiles.fileUrl
        };
    }
}
exports.PrismaAppointmentsFilesMapper = PrismaAppointmentsFilesMapper;
