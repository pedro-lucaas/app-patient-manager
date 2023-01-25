import { AttributesRepository } from "@application/repositories/attributes-repository";
import { PatientsRepository } from "@application/repositories/patients-repository";
export declare class UpdatePatientRequest {
    patientId: string;
    name?: string;
    email?: string;
    phone?: string;
    sex?: string;
    birthDate?: Date;
    comments?: string;
}
export declare class UpdatePatientUseCase {
    private readonly patientsRepository;
    private readonly attributesRepository;
    constructor(patientsRepository: PatientsRepository, attributesRepository: AttributesRepository);
    execute(request: UpdatePatientRequest, ...requestAttributes: any[]): Promise<void>;
}
