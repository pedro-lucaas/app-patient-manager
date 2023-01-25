import { Patient } from "@application/entities/patient/patient";
import { PatientAttributes } from "@application/entities/patient/patientAttributes";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Injectable } from "@nestjs/common";

export class UpdatePatientRequest {
  patientId: string;
  name?: string;
  email?: string;
  phone?: string;
  sex?: string;
  birthDate?: Date;
  comments?: string;
}

@Injectable()
export class UpdatePatientUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly attributesRepository: AttributesRepository,
  ) { }

  async execute(request: UpdatePatientRequest, ...requestAttributes: any[]): Promise<void> {
    const { patientId, email, ...props } = request;

    const newPatient = await this.patientsRepository.findById(patientId);
    if (!newPatient) {
      throw new Error("Patient not found")
    }
    if (email) {
      const patient = await this.patientsRepository.findByEmail(email);
      if (patient && patient.patientId !== patientId) {
        throw new Error("Email already registered")
      }
    }
    for (const element of Object.entries(requestAttributes[0])) {
      if (element[1] !== true && element[1] !== false) {
        throw new Error(`Attribute '${element[0]}' must be a boolean`);
      }
    }
    for (const element of Object.entries(requestAttributes[0])) {
      const attribute = await this.attributesRepository.findByName(element[0]);
      if (!attribute) {
        throw new Error(`Attribute '${element[0]}' not found`);
      }
    }

    const attributes: PatientAttributes[] =
      Object.entries(requestAttributes[0]).reduce((a, v) => ([...a, { name: v[0], value: v[1] ? true : false }]), [])

    newPatient.name = props.name ?? newPatient.name;
    newPatient.email = email ?? newPatient.email;
    newPatient.phone = props.phone ?? newPatient.phone;
    newPatient.sex = props.sex ?? newPatient.sex;
    newPatient.birthDate = props.birthDate.getTime() ? props.birthDate : newPatient.birthDate;
    newPatient.comments = props.comments ?? newPatient.comments;
    newPatient.attributes = attributes;

    this.patientsRepository.save(newPatient)
  }
}