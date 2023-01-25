import { Patient } from "@application/entities/patient/patient";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Pagination } from "@helpers/Pagination";
export declare class ListPatientsRequest {
    page?: number;
    search?: string;
    attribute?: string;
    sex?: string;
}
export declare class ListPatientsResponse {
    patients: Pagination<Patient>;
}
export declare class ListPatientsUseCase {
    private readonly patientsRepository;
    constructor(patientsRepository: PatientsRepository);
    execute(request: ListPatientsRequest): Promise<ListPatientsResponse>;
}
