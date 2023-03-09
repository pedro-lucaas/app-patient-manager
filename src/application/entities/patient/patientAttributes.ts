export interface IPatientAttributes {
  name: string;
  value: string;
}


export class PatientAttributes {
  private props: IPatientAttributes;
  attributeId: any;

  constructor(props: IPatientAttributes) {
    this.props = props;
  }

  // Getters
  get name(): string {
    return this.props.name;
  }
  get value(): string {
    return this.props.value;
  }

  // Setters
  set value(value: string) {
    this.props.value = value;
  }

}