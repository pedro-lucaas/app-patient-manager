import { Appointment } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
export declare class ListAppointmentsRequest {
    initDate: Date;
    endDate: Date;
}
export declare class ListAppointmentsResponse {
    appointments: Array<Appointment>;
}
export declare class ListAppointmentsUseCase {
    private readonly appointmentsRepository;
    constructor(appointmentsRepository: AppointmentsRepository);
    execute(request: ListAppointmentsRequest): Promise<ListAppointmentsResponse>;
}