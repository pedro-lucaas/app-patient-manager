import { AppointmentsRepository } from "@application/repositories/appointments-repository";
export declare class CancelAppointmentUseCaseRequest {
    appointmentId: string;
    cancelReason: string;
}
export declare class CancelAppointmentUseCase {
    private readonly appointmentsRepository;
    constructor(appointmentsRepository: AppointmentsRepository);
    execute(request: CancelAppointmentUseCaseRequest): Promise<void>;
}
