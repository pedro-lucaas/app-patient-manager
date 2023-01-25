import { Appointment } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { Pagination } from "@helpers/Pagination";
export declare class ListPatientAppointmentsRequest {
    patientId: string;
    page?: number;
    limit?: number;
}
export declare class ListPatientAppointmentsResponse {
    appointments: Pagination<Appointment>;
}
export declare class ListPatientAppointmentsUseCase {
    private readonly appointmentsRepository;
    constructor(appointmentsRepository: AppointmentsRepository);
    execute(request: ListPatientAppointmentsRequest): Promise<ListPatientAppointmentsResponse>;
}
