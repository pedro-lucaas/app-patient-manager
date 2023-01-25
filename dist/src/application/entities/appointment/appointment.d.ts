import { Replace } from "src/helpers/Replace";
import { Patient } from "../patient/patient";
import { AppointmentFiles } from "./appointment-files";
export declare enum AppointmentStatus {
    SCHEDULED = "scheduled",
    STARTED = "started",
    FINISHED = "finished",
    CANCELED = "canceled"
}
export interface IAppointment {
    patientId?: string;
    patient?: Patient;
    userId: string;
    initDate?: Date;
    endDate?: Date;
    status: AppointmentStatus;
    procedure: string;
    price: number;
    paid?: boolean;
    comments?: string;
    cancelReason?: string;
    files?: AppointmentFiles[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class Appointment {
    private _appointmentId;
    private props;
    private set;
    private validDates;
    constructor(props: Replace<IAppointment, {
        status?: AppointmentStatus;
        createdAt?: Date;
        updatedAt?: Date;
    }>, appointmentId?: string);
    get appointmentId(): string;
    get userId(): string;
    get patientId(): string;
    get patient(): Patient;
    get initDate(): Date;
    get endDate(): Date;
    get status(): AppointmentStatus;
    get procedure(): string;
    get price(): number;
    get paid(): boolean;
    get comments(): string;
    get cancelReason(): string;
    get files(): AppointmentFiles[];
    get createdAt(): Date;
    get updatedAt(): Date;
    set initDate(initDate: Date);
    set endDate(endDate: Date);
    set status(status: AppointmentStatus);
    set comments(comments: string);
    set cancelReason(cancelReason: string);
    set files(files: AppointmentFiles[]);
    cancel(cancelReason: string): void;
    start(): void;
    finish(): void;
}
