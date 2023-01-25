import { AppointmentViewModel } from "../view-models/appointments-view-model";
import { ListPatientAppointmentsQuery } from "../dtos/list-patient-appointments-query";
import { ListAppointmentsUseCase } from "@application/use-cases/users/list-appointments";
export declare class ListAppointmentsController {
    private readonly listAppointmentsUseCase;
    constructor(listAppointmentsUseCase: ListAppointmentsUseCase);
    handle(query?: ListPatientAppointmentsQuery): Promise<{
        items: AppointmentViewModel[];
    }>;
}
