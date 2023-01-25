"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaAttributesMapper = void 0;
const attribute_1 = require("../../../../application/entities/attribute/attribute");
const prisma_patient_attributes_mapper_1 = require("./prisma-patient-attributes-mapper");
class PrismaAttributesMapper {
    static toPrisma(attribute) {
        return {
            name: attribute.name,
        };
    }
    static toDomain(raw) {
        if (!raw)
            return null;
        return new attribute_1.Attribute({
            name: raw.name,
            patients: raw.patientAttributes ? raw.patientAttributes.map(prisma_patient_attributes_mapper_1.PrismaPatientAttributesMapper.toDomain) : [],
        });
    }
}
exports.PrismaAttributesMapper = PrismaAttributesMapper;
