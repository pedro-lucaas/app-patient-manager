/// <reference types="multer" />
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { S3Service } from "@application/services/s3-service";
export declare class UpdateAppointmentRequest {
    appointmentId: string;
    comments?: string;
    cancelReason?: string;
    files?: Express.Multer.File[];
}
export declare class UpdateAppointmentUseCase {
    private readonly appointmentsRepository;
    private readonly s3Service;
    constructor(appointmentsRepository: AppointmentsRepository, s3Service: S3Service);
    update(request: UpdateAppointmentRequest): Promise<void>;
    start(request: UpdateAppointmentRequest): Promise<void>;
    finish(request: UpdateAppointmentRequest): Promise<void>;
    cancel(request: UpdateAppointmentRequest): Promise<void>;
}
