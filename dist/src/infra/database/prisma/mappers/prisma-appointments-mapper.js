"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAppointmentsMapper = void 0;
const appointment_1 = require("../../../../application/entities/appointment/appointment");
const prisma_appointments_files_mapper_1 = require("./prisma-appointments-files-mapper");
const prisma_patients_mapper_1 = require("./prisma-patients-mapper");
class PrismaAppointmentsMapper {
    static toPrisma(appointment) {
        var _a;
        return {
            id: appointment.appointmentId,
            userId: appointment.userId,
            patientId: appointment.patientId,
            initDate: appointment.initDate,
            endDate: (_a = appointment.endDate) !== null && _a !== void 0 ? _a : null,
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
    static toDomain(raw) {
        if (!raw) {
            return null;
        }
        return new appointment_1.Appointment({
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
            patient: raw.patient && prisma_patients_mapper_1.PrismaPatientsMapper.toDomain(raw.patient),
            files: raw.AppointmentsFiles && raw.AppointmentsFiles.map(prisma_appointments_files_mapper_1.PrismaAppointmentsFilesMapper.toDomain),
        }, raw.id);
    }
}
exports.PrismaAppointmentsMapper = PrismaAppointmentsMapper;
