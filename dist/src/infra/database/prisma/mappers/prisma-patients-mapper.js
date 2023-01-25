"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPatientsMapper = void 0;
const patient_1 = require("../../../../application/entities/patient/patient");
const prisma_patient_attributes_mapper_1 = require("./prisma-patient-attributes-mapper");
class PrismaPatientsMapper {
    static toPrisma(patient) {
        return {
            id: patient.patientId,
            userId: patient.userId,
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            sex: patient.sex,
            birthDate: patient.birthDate,
            comments: patient.comments,
            createdAt: patient.createdAt,
            updatedAt: patient.updatedAt,
            canceledAt: patient.canceledAt,
        };
    }
    static toDomain(raw) {
        if (!raw)
            return null;
        return new patient_1.Patient({
            userId: raw.userId,
            name: raw.name,
            email: raw.email,
            phone: raw.phone,
            sex: raw.sex,
            birthDate: raw.birthDate,
            comments: raw.comments,
            attributes: raw.patientAttributes && raw.patientAttributes.map(prisma_patient_attributes_mapper_1.PrismaPatientAttributesMapper.toDomain),
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            canceledAt: raw.canceledAt,
        }, raw.id);
    }
}
exports.PrismaPatientsMapper = PrismaPatientsMapper;
