import { PatientAttributes } from "@application/entities/patient/patientAttributes";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Injectable } from "@nestjs/common";

export class CreateAttributeRequest {
  patientId: string;
  name: string;
  value: string;
}

@Injectable()
export class CreateAttributeUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
  ) { }

  async execute(request: CreateAttributeRequest): Promise<void> {
    const { name, patientId, value } = request;
    const patient = await this.patientsRepository.findById(patientId);

    if (!patient) {
      throw new Error("Patient not found")
    }

    const attribute = patient.attributes.find(a => a.name === name);

    if (attribute) {
      attribute.value = value;
    } else {
      patient.attributes.push(new PatientAttributes({ name, value }));
    }

    this.patientsRepository.save(patient)
  }
}