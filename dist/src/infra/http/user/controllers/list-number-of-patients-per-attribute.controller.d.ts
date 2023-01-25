import { ListNumberOfPatientsPerAttributeUseCase } from "@application/use-cases/users/list-number-of-patients-per-attributes";
export declare class ListNumberOfPatientsPerAttributeController {
    private readonly listNumberOfPatientsPerAttribute;
    constructor(listNumberOfPatientsPerAttribute: ListNumberOfPatientsPerAttributeUseCase);
    handle(): Promise<[string, number][]>;
}
