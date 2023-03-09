import { Patient } from "@application/entities/patient/patient";
import { PatientAttributes } from "@application/entities/patient/patientAttributes";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Injectable } from "@nestjs/common";

export class CreatePatientRequest {
  userId: string;
  name: string;
  cpf: string;
  caregiver: string;
  email: string;
  phone: string;
  phone2?: string;
  sex: string;
  civilStatus?: string;
  birthDate: Date;
  schooling?: string;
  addressCep?: string;
  address?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  country?: string;
  comments?: string;
}

@Injectable()
export class CreatePatientUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
  ) { }

  async execute(request: CreatePatientRequest): Promise<void> {
    const {
      userId,
      name,
      cpf,
      caregiver,
      email,
      phone,
      phone2,
      sex,
      civilStatus,
      birthDate,
      schooling,
      addressCep,
      address,
      number,
      complement,
      district,
      city,
      state,
      country,
      comments
    } = request
    const patient = await this.patientsRepository.findByEmail(email);
    if (patient) {
      throw new Error("Email already registered")
    }

    const newPatient = new Patient({
      userId,
      name: name.toUpperCase(),
      cpf,
      caregiver,
      email,
      phone,
      phone2,
      sex,
      civilStatus,
      birthDate,
      schooling,
      address,
      addressCep,
      number,
      complement,
      district,
      city,
      state,
      country,
      comments,
      attributes: []
    })

    this.patientsRepository.create(newPatient)
  }
}