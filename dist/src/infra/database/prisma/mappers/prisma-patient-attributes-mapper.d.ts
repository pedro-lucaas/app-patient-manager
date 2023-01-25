import { PatientAttributes } from "@application/entities/patient/patientAttributes";
export declare class PrismaPatientAttributesMapper {
    static toPrisma(attribute: PatientAttributes): {
        name: string;
        value: boolean;
    };
    static toDomain(raw: any): PatientAttributes;
}
