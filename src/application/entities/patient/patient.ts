import { randomUUID } from "node:crypto";
import { Replace } from "src/helpers/Replace";
import { PatientAttributes } from "./patientAttributes";

export interface IPatient {
  userId: string;
  name: string;
  email?: string;
  phone: string;
  sex: string;
  birthDate: Date;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
  canceledAt?: Date;
  attributes: PatientAttributes[];
}

export class Patient {
  private _patientId: string;
  private props: IPatient;

  // private methods
  private set(props: Partial<IPatient>): void {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    };
  }

  constructor(props: Replace<IPatient, { createdAt?: Date, updatedAt?: Date }>, patientId?: string) {
    this._patientId = patientId ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  // Getters
  get patientId(): string {
    return this._patientId;
  }
  get userId(): string {
    return this.props.userId;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }
  get phone(): string {
    return this.props.phone;
  }
  get sex(): string {
    return this.props.sex;
  }
  get birthDate(): Date {
    return this.props.birthDate;
  }
  get comments(): string {
    return this.props.comments;
  }
  get attributes(): PatientAttributes[] {
    return this.props.attributes;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
  get canceledAt(): Date {
    return this.props.canceledAt;
  }

  // Setters
  set name(name: string) {
    this.set({ name });
  }
  set email(email: string) {
    this.set({ email });
  }
  set phone(phone: string) {
    this.set({ phone });
  }
  set sex(sex: string) {
    this.set({ sex })
  }
  set birthDate(birthDate: Date) {
    this.set({ birthDate });
  }
  set comments(comments: string) {
    this.set({ comments });
  }
  set attributes(attributes: PatientAttributes[]) {
    this.set({ attributes });
  }

  // Methods
  cancel(): void {
    this.set({ canceledAt: this.props.canceledAt ?? new Date() });
  }
}