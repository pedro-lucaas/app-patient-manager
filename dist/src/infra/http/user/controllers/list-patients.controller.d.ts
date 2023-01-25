import { ListPatientsUseCase } from "@application/use-cases/users/list-patients";
import { PatientViewModel } from "../view-models/patient-view-model";
export declare class ListPatientsController {
    private listPatients;
    constructor(listPatients: ListPatientsUseCase);
    handle(page: number, search: string, attribute: string, sex: string): Promise<{
        items: PatientViewModel[];
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    }>;
    s: any;
}
