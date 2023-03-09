import { Patient } from "@application/entities/patient/patient";
import { PatientAttributes } from "@application/entities/patient/patientAttributes";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Injectable } from "@nestjs/common";

export class UpdatePatientRequest {
  patientId: string;
  name?: string;
  cpf?: string;
  caregiver?: string;
  email?: string;
  phone?: string;
  phone2?: string;
  sex?: string;
  civilStatus?: string;
  birthDate?: Date;
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
export class UpdatePatientUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
  ) { }

  async execute(request: UpdatePatientRequest): Promise<void> {
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

    newPatient.name = props.name.toUpperCase() ?? newPatient.name;
    newPatient.cpf = props.cpf ?? newPatient.cpf;
    newPatient.caregiver = props.caregiver ?? newPatient.caregiver;
    newPatient.email = email ?? newPatient.email;
    newPatient.phone = props.phone ?? newPatient.phone;
    newPatient.phone2 = props.phone2 ?? newPatient.phone2;
    newPatient.sex = props.sex ?? newPatient.sex;
    newPatient.civilStatus = props.civilStatus ?? newPatient.civilStatus;
    newPatient.birthDate = props.birthDate.getTime() ? props.birthDate : newPatient.birthDate;
    newPatient.schooling = props.schooling ?? newPatient.schooling;
    newPatient.addressCep = props.addressCep ?? newPatient.addressCep;
    newPatient.address = props.address ?? newPatient.address;
    newPatient.number = props.number ?? newPatient.number;
    newPatient.complement = props.complement ?? newPatient.complement;
    newPatient.district = props.district ?? newPatient.district;
    newPatient.city = props.city ?? newPatient.city;
    newPatient.state = props.state ?? newPatient.state;
    newPatient.country = props.country ?? newPatient.country;
    newPatient.comments = props.comments ?? newPatient.comments;

    this.patientsRepository.save(newPatient)
  }
}