import { PatientAttributes } from "@application/entities/patient/patientAttributes";

export class PrismaPatientAttributesMapper {
  static toPrisma(attribute: PatientAttributes) {
    return {
      name: attribute.name,
      value: attribute.value,
    };
  }

  static toDomain(raw: any): PatientAttributes {
    if (!raw) return null;
    return new PatientAttributes({
      name: raw.name,
      value: raw.value
    });
  }
}