import { PatientAttributes } from "../patient/patientAttributes";
export interface IAttribute {
    name: string;
    patients?: PatientAttributes[];
}
export declare class Attribute {
    private props;
    constructor(props: IAttribute);
    get name(): string;
    get patients(): PatientAttributes[];
}
