/// <reference types="multer" />
import { ScheduleAppointmentsUseCase } from "@application/use-cases/users/schedule-appointment";
import { ScheduleAppointmentBody } from "../dtos/schedule-appointment-body";
export declare class ScheduleAppointmentsController {
    private readonly scheduleAppointmentsUseCase;
    constructor(scheduleAppointmentsUseCase: ScheduleAppointmentsUseCase);
    handle(body: ScheduleAppointmentBody, req: any, files?: Array<Express.Multer.File>): Promise<void>;
}
