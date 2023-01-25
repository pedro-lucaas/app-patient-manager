import { ListPatientAppointmentsUseCase } from "@application/use-cases/users/list-patient-appointments";
import { AppointmentViewModel } from "../view-models/appointments-view-model";
export declare class ListPatientAppointmentsController {
    private readonly listPatientAppointmentsUseCase;
    constructor(listPatientAppointmentsUseCase: ListPatientAppointmentsUseCase);
    handle(patientId: string, page: number, limit: number): Promise<{
        items: AppointmentViewModel[];
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    }>;
}
