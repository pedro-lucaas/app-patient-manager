export interface IAppointmentFiles {
    id?: number;
    appointmentId: string;
    fileName: string;
    fileUrl: string;
}
export declare class AppointmentFiles {
    private props;
    constructor(props: IAppointmentFiles);
    get id(): number;
    get appointmentId(): string;
    get fileName(): string;
    get fileUrl(): string;
}
