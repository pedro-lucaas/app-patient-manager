import { Patient } from "@application/entities/patient/patient";
import { PatientAttributes } from "@application/entities/patient/patientAttributes";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Injectable } from "@nestjs/common";

export class CreatePatientRequest {
  userId: string;
  name: string;
  email: string;
  phone: string;
  sex: string;
  birthDate: Date;
  comments?: string;
}

@Injectable()
export class CreatePatientUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly attributesRepository: AttributesRepository,
  ) { }

  async execute(request: CreatePatientRequest, ...requestAttributes: any[]): Promise<void> {
    const { name, email, phone, sex, birthDate, comments, userId } = request;
    const patient = await this.patientsRepository.findByEmail(email);
    if (patient) {
      throw new Error("Email already registered")
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

    const newPatient = new Patient({
      userId,
      name,
      email,
      phone,
      sex,
      birthDate,
      comments,
      attributes,
    })

    this.patientsRepository.create(newPatient)
  }
}