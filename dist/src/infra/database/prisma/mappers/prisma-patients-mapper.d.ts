import { Patient } from "@application/entities/patient/patient";
export declare class PrismaPatientsMapper {
    static toPrisma(patient: Patient): {
        id: string;
        userId: string;
        name: string;
        cpf: string;
        caregiver: string;
        email: string;
        phone: string;
        phone2: string;
        sex: string;
        civilStatus: string;
        birthDate: Date;
        schooling: string;
        addressCep: string;
        address: string;
        number: string;
        complement: string;
        district: string;
        city: string;
        state: string;
        country: string;
        comments: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date;
    };
    static toDomain(raw: any): Patient;
}
