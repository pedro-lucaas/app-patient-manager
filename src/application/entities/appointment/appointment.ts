import { addHours, addMinutes, isBefore, isDate } from "date-fns";
import { randomUUID } from "node:crypto";
import { Replace } from "src/helpers/Replace";
import { Patient } from "../patient/patient";
import { AppointmentFiles } from "./appointment-files";

export enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  STARTED = 'started',
  FINISHED = 'finished',
  CANCELED = 'canceled',
}

export enum ConfirmedBy {
  WHATSAPP = 'WHATSAPP',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
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
  confirmedBy?: ConfirmedBy;
  paid?: boolean;
  medicalRecord?: string;
  comments?: string;
  cancelReason?: string;
  files?: AppointmentFiles[];
  createdAt: Date;
  updatedAt: Date;
}

export class Appointment {
  private _appointmentId: string;
  private props: IAppointment;

  // private methods
  private set(props: Partial<IAppointment>): void {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
    this.validDates();
  }

  // validators
  private validDates(): void {
    if (isDate(this.props.initDate) && isDate(this.props.endDate)) {
      if (!isBefore(this.props.initDate, this.props.endDate)) {
        throw new Error('Init date must be before end date');
      }
    }
  }

  constructor(props: Replace<IAppointment, { status?: AppointmentStatus, createdAt?: Date, updatedAt?: Date }>, appointmentId?: string) {
    this._appointmentId = appointmentId ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      status: props.status ?? AppointmentStatus.SCHEDULED,
    };
    this.validDates();
  }

  // Getters
  get appointmentId(): string {
    return this._appointmentId;
  }
  get userId(): string {
    return this.props.userId;
  }
  get patientId(): string {
    return this.props.patientId;
  }
  get patient(): Patient {
    return this.props.patient;
  }
  get initDate(): Date {
    return this.props.initDate;
  }
  get endDate(): Date {
    return this.props.endDate;
  }
  get status(): AppointmentStatus {
    return this.props.status;
  }
  get procedure(): string {
    return this.props.procedure;
  }
  get price(): number {
    return this.props.price;
  }
  get confirmedBy(): ConfirmedBy {
    return this.props.confirmedBy;
  }
  get paid(): boolean {
    return this.props.paid;
  }
  get medicalRecord(): string {
    return this.props.medicalRecord;
  }
  get comments(): string {
    return this.props.comments;
  }
  get cancelReason(): string {
    return this.props.cancelReason;
  }
  get files(): AppointmentFiles[] {
    return this.props.files;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Setters
  setDates(initDate: Date, endDate: Date) {
    this.set({ initDate, endDate });
  }

  set procedure(procedure: string) {
    this.set({ procedure });
  }
  set price(price: number) {
    this.set({ price });
  }
  set paid(paid: boolean) {
    this.set({ paid });
  }
  set confirmedBy(confirmedBy: ConfirmedBy) {
    this.set({ confirmedBy });
  }
  set status(status: AppointmentStatus) {
    this.set({ status });
  }
  set medicalRecord(medicalRecord: string) {
    // console.log("files", this.files);
    this.files.filter(file => medicalRecord.search(file.fileUrl) === -1).forEach(file => this.files.splice(this.files.indexOf(file), 1));
    // console.log("files", this.files);
    this.set({ medicalRecord });
  }
  set comments(comments: string) {
    this.set({ comments });
  }
  set cancelReason(cancelReason: string) {
    this.set({ cancelReason });
  }
  set files(files: AppointmentFiles[]) {
    this.set({ files });
  }

  // Methods
  cancel(cancelReason: string): void {
    this.set({
      status: AppointmentStatus.CANCELED,
      cancelReason,
    });
  }

  start(): void {
    this.set({
      status: AppointmentStatus.STARTED,
      initDate: new Date(),
      cancelReason: undefined,
      endDate: addHours(new Date(), 1),
    });
    this.validDates();
  }

  finish(): void {
    this.set({
      status: AppointmentStatus.FINISHED,
      endDate: new Date(),
      cancelReason: undefined,
    });
    this.validDates();
  }
}