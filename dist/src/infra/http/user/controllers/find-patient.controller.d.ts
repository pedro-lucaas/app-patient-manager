import { FindPatientUseCase } from "@application/use-cases/users/find-patient";
import { PatientViewModel } from "../view-models/patient-view-model";
export declare class FindPatientController {
    private findPatient;
    constructor(findPatient: FindPatientUseCase);
    handle(id: string): Promise<PatientViewModel>;
}
