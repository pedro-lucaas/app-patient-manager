import { CreatePatientUseCase } from "@application/use-cases/users/create-patient";
import { CreatePatientBody } from "../dtos/create-patient-body";
export declare class CreatePatientController {
    private readonly createPatient;
    constructor(createPatient: CreatePatientUseCase);
    handle(body: CreatePatientBody, req: any): Promise<void>;
}
