import { Patient } from "@application/entities/patient/patient";
import { PatientsRepository } from "@application/repositories/patients-repository";
export declare class FindPatientRequest {
    id?: string;
}
export declare class FindPatientResponse {
    patient: Patient;
}
export declare class FindPatientUseCase {
    private readonly patientsRepository;
    constructor(patientsRepository: PatientsRepository);
    execute(request: FindPatientRequest): Promise<FindPatientResponse>;
}
