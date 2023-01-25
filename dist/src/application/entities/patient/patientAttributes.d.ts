export interface IPatientAttributes {
    name: string;
    value: boolean;
}
export declare class PatientAttributes {
    private props;
    attributeId: any;
    constructor(props: IPatientAttributes);
    get name(): string;
    get value(): boolean;
    set value(value: boolean);
}
