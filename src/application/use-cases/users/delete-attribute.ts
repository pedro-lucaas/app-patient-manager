import { PatientsRepository } from "@application/repositories/patients-repository";
import { Injectable } from "@nestjs/common";

export class DeleteAttributeRequest {
  patientId: string;
  name: string;
}

@Injectable()
export class DeleteAttributeUseCase {
  constructor(
    private readonly patients: PatientsRepository,
  ) { }

  async execute(request: DeleteAttributeRequest): Promise<void> {
    const { name, patientId } = request;
    const patient = await this.patients.findById(patientId);

    if (!patient) {
      throw new Error("Patient not found")
    }

    const attribute = patient.attributes.find(a => a.name === name);

    if (!attribute) {
      throw new Error("Attribute not found")
    }

    patient.attributes = patient.attributes.filter(a => a.name !== name);


    this.patients.save(patient)
  }
}