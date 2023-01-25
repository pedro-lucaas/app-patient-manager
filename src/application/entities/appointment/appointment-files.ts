
export interface IAppointmentFiles {
  id?: number;
  appointmentId: string;
  fileName: string;
  fileUrl: string;
}

export class AppointmentFiles {
  private props: IAppointmentFiles;

  constructor(props: IAppointmentFiles) {
    this.props = props;
  }

  get id(): number {
    return this.props.id;
  }

  get appointmentId(): string {
    return this.props.appointmentId;
  }

  get fileName(): string {
    return this.props.fileName;
  }

  get fileUrl(): string {
    return this.props.fileUrl;
  }

}