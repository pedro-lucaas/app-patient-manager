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
export declare class Patient {
    private _patientId;
    private props;
    private set;
    constructor(props: Replace<IPatient, {
        createdAt?: Date;
        updatedAt?: Date;
    }>, patientId?: string);
    get patientId(): string;
    get userId(): string;
    get name(): string;
    get email(): string;
    get phone(): string;
    get sex(): string;
    get birthDate(): Date;
    get comments(): string;
    get attributes(): PatientAttributes[];
    get createdAt(): Date;
    get updatedAt(): Date;
    get canceledAt(): Date;
    set name(name: string);
    set email(email: string);
    set phone(phone: string);
    set sex(sex: string);
    set birthDate(birthDate: Date);
    set comments(comments: string);
    set attributes(attributes: PatientAttributes[]);
    cancel(): void;
}
