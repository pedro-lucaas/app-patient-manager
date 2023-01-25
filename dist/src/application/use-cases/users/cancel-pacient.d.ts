import { PatientsRepository } from "@application/repositories/patients-repository";
export declare class CancelPatientRequest {
    patientId: string;
}
export declare class CancelPatientUseCase {
    private readonly patientsRepository;
    constructor(patientsRepository: PatientsRepository);
    execute(request: CancelPatientRequest): Promise<void>;
}
