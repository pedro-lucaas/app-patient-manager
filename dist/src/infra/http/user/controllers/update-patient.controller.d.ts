import { UpdatePatientUseCase } from "@application/use-cases/users/update-patient";
import { UpdatePatientBody } from "../dtos/update-patient-body";
export declare class UpdatePatientController {
    private readonly updatePatient;
    constructor(updatePatient: UpdatePatientUseCase);
    handle(id: string, body: UpdatePatientBody): Promise<void>;
}
