/// <reference types="multer" />
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { S3Service } from "@application/services/s3-service";
export declare class ScheduleAppointmentsUseCaseRequest {
    patientId: string;
    userId: string;
    procedure: string;
    price: number;
    paid?: boolean;
    initDate: Date;
    endDate: Date;
    comments?: string;
    files?: Express.Multer.File[];
}
export declare class ScheduleAppointmentsUseCase {
    private readonly patientsRepository;
    private readonly appointmentsRepository;
    private readonly s3Service;
    constructor(patientsRepository: PatientsRepository, appointmentsRepository: AppointmentsRepository, s3Service: S3Service);
    execute(request: ScheduleAppointmentsUseCaseRequest): Promise<void>;
}
