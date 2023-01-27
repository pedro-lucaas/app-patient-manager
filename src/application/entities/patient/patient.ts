import { randomUUID } from "node:crypto";
import { Replace } from "src/helpers/Replace";
import { PatientAttributes } from "./patientAttributes";

export interface IPatient {
  userId: string;
  name: string;
  cpf: string;
  caregiver?: string;
  email?: string;
  phone: string;
  phone2?: string;
  sex: string;
  civilStatus?: string;
  birthDate: Date;
  schooling?: string;
  addressCep?: string;
  address?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
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
  get cpf(): string {
    return this.props.cpf;
  }
  get caregiver(): string {
    return this.props.caregiver;
  }
  get email(): string {
    return this.props.email;
  }
  get phone(): string {
    return this.props.phone;
  }
  get phone2(): string {
    return this.props.phone2;
  }
  get sex(): string {
    return this.props.sex;
  }
  get civilStatus(): string {
    return this.props.civilStatus;
  }
  get birthDate(): Date {
    return this.props.birthDate;
  }
  get schooling(): string {
    return this.props.schooling;
  }
  get addressCep(): string {
    return this.props.addressCep;
  }
  get address(): string {
    return this.props.address;
  }
  get number(): string {
    return this.props.number;
  }
  get complement(): string {
    return this.props.complement;
  }
  get district(): string {
    return this.props.district;
  }
  get city(): string {
    return this.props.city;
  }
  get state(): string {
    return this.props.state;
  }
  get country(): string {
    return this.props.country;
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
  set cpf(cpf: string) {
    this.set({ cpf });
  }
  set caregiver(caregiver: string) {
    this.set({ caregiver });
  }
  set email(email: string) {
    this.set({ email });
  }
  set phone(phone: string) {
    this.set({ phone });
  }
  set phone2(phone2: string) {
    this.set({ phone2 });
  }
  set sex(sex: string) {
    this.set({ sex })
  }
  set civilStatus(civilStatus: string) {
    this.set({ civilStatus });
  }
  set birthDate(birthDate: Date) {
    this.set({ birthDate });
  }
  set schooling(schooling: string) {
    this.set({ schooling });
  }
  set addressCep(addressCep: string) {
    this.set({ addressCep });
  }
  set address(address: string) {
    this.set({ address });
  }
  set number(number: string) {
    this.set({ number });
  }
  set complement(complement: string) {
    this.set({ complement });
  }
  set district(district: string) {
    this.set({ district });
  }
  set city(city: string) {
    this.set({ city });
  }
  set state(state: string) {
    this.set({ state });
  }
  set country(country: string) {
    this.set({ country });
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