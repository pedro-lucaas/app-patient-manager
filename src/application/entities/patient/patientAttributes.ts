export interface IPatientAttributes {
  name: string;
  value: boolean;
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
  get value(): boolean {
    return this.props.value;
  }

  // Setters
  set value(value: boolean) {
    this.props.value = value;
  }

}