import { Patient } from "@application/entities/patient/patient";
import { PrismaAppointmentsMapper } from "./prisma-appointments-mapper";
import { PrismaPatientAttributesMapper } from "./prisma-patient-attributes-mapper";

export class PrismaPatientsMapper {
  static toPrisma(patient: Patient) {
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
    }
  }

  static toDomain(raw: any) {
    if (!raw) return null;
    return new Patient({
      userId: raw.userId,
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      sex: raw.sex,
      birthDate: raw.birthDate,
      comments: raw.comments,
      attributes: raw.patientAttributes && raw.patientAttributes.map(PrismaPatientAttributesMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      canceledAt: raw.canceledAt,
    }, raw.id)
  }
}
