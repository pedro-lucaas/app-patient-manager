import { CancelPatientUseCase } from "@application/use-cases/users/cancel-pacient";
import { CancelPatientBody } from "../dtos/cancel-patient-body";
export declare class CancelPatientController {
    private readonly addPatient;
    constructor(addPatient: CancelPatientUseCase);
    handle(body: CancelPatientBody): Promise<void>;
}
