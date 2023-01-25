import { Patient } from "@application/entities/patient/patient";
export declare class PrismaPatientsMapper {
    static toPrisma(patient: Patient): {
        id: string;
        userId: string;
        name: string;
        email: string;
        phone: string;
        sex: string;
        birthDate: Date;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date;
    };
    static toDomain(raw: any): Patient;
}
