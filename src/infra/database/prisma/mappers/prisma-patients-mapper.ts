import { Patient } from "@application/entities/patient/patient";
import { PrismaAppointmentsMapper } from "./prisma-appointments-mapper";
import { PrismaPatientAttributesMapper } from "./prisma-patient-attributes-mapper";

export class PrismaPatientsMapper {
  static toPrisma(patient: Patient) {
    return {
      id: patient.patientId,
      userId: patient.userId,
      name: patient.name,
      cpf: patient.cpf,
      caregiver: patient.caregiver,
      email: patient.email,
      phone: patient.phone,
      phone2: patient.phone2,
      sex: patient.sex,
      civilStatus: patient.civilStatus,
      birthDate: patient.birthDate,
      schooling: patient.schooling,
      addressCep: patient.addressCep,
      address: patient.address,
      number: patient.number,
      complement: patient.complement,
      district: patient.district,
      city: patient.city,
      state: patient.state,
      country: patient.country,
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
      cpf: raw.cpf,
      caregiver: raw.caregiver,
      email: raw.email,
      phone: raw.phone,
      phone2: raw.phone2,
      sex: raw.sex,
      civilStatus: raw.civilStatus,
      birthDate: raw.birthDate,
      schooling: raw.schooling,
      addressCep: raw.addressCep,
      address: raw.address,
      number: raw.number,
      complement: raw.complement,
      district: raw.district,
      city: raw.city,
      state: raw.state,
      country: raw.country,
      comments: raw.comments,
      attributes: raw.patientAttributes && raw.patientAttributes.map(PrismaPatientAttributesMapper.toDomain),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      canceledAt: raw.canceledAt,
    }, raw.id)
  }
}
