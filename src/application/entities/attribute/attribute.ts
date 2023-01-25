import { PatientAttributes } from "../patient/patientAttributes";

export interface IAttribute {
  name: string;
  patients?: PatientAttributes[];
}

export class Attribute {
  private props: IAttribute;

  constructor(props: IAttribute) {
    this.props = props;
  }

  // Getters
  get name(): string {
    return this.props.name;
  }
  get patients(): PatientAttributes[] {
    return this.props.patients;
  }

}