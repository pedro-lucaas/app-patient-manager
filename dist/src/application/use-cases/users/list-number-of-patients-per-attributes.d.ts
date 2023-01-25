import { AttributesRepository } from '@application/repositories/attributes-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
export declare class ListNumberOfPatientsPerAttributeResponse {
    result: [string, number][];
}
export declare class ListNumberOfPatientsPerAttributeUseCase {
    private readonly patientsRepository;
    private readonly attributesRepository;
    constructor(patientsRepository: PatientsRepository, attributesRepository: AttributesRepository);
    execute(): Promise<ListNumberOfPatientsPerAttributeResponse>;
}
