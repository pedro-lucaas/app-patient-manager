import { AttributesRepository } from "@application/repositories/attributes-repository";
import { PatientsRepository } from "@application/repositories/patients-repository";
export declare class CreatePatientRequest {
    userId: string;
    name: string;
    cpf: string;
    caregiver: string;
    email: string;
    phone: string;
    phone2?: string;
    sex: string;
    civilStatus?: string;
    birthDate: Date;
    schooling?: string;
    addressCep?: string;
    address?: string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    state?: string;
    country?: string;
    comments?: string;
}
export declare class CreatePatientUseCase {
    private readonly patientsRepository;
    private readonly attributesRepository;
    constructor(patientsRepository: PatientsRepository, attributesRepository: AttributesRepository);
    execute(request: CreatePatientRequest, ...requestAttributes: any[]): Promise<void>;
}
