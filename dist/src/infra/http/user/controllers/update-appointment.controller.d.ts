/// <reference types="multer" />
import { UpdateAppointmentUseCase } from "@application/use-cases/users/update-appointment";
import { UpdateAppointmentBody, CancelAppointmentBody } from "../dtos/update-appointment-body";
export declare class UpdateAppointmentController {
    private readonly updateAppointment;
    constructor(updateAppointment: UpdateAppointmentUseCase);
    update(appointmentId: string, body: UpdateAppointmentBody, files: Array<Express.Multer.File>): Promise<void>;
    cancel(appointmentId: string, body: CancelAppointmentBody): Promise<void>;
    start(appointmentId: string): Promise<void>;
    finish(appointmentId: string): Promise<void>;
}
