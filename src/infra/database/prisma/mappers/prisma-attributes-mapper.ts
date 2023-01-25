import { Attribute } from "@application/entities/attribute/attribute";
import { PrismaPatientAttributesMapper } from "./prisma-patient-attributes-mapper";

export class PrismaAttributesMapper {
  static toPrisma(attribute: Attribute) {
    return {
      name: attribute.name,
    };
  }

  static toDomain(raw: any): Attribute {
    if (!raw) return null;
    return new Attribute({
      name: raw.name,
      patients: raw.patientAttributes ? raw.patientAttributes.map(PrismaPatientAttributesMapper.toDomain) : [],
    });
  }
}