"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPatientAttributesMapper = void 0;
const patientAttributes_1 = require("../../../../application/entities/patient/patientAttributes");
class PrismaPatientAttributesMapper {
    static toPrisma(attribute) {
        return {
            name: attribute.name,
            value: attribute.value,
        };
    }
    static toDomain(raw) {
        if (!raw)
            return null;
        return new patientAttributes_1.PatientAttributes({
            name: raw.name,
            value: raw.value
        });
    }
}
exports.PrismaPatientAttributesMapper = PrismaPatientAttributesMapper;
