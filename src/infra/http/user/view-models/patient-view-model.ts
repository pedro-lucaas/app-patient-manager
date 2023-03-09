import { Patient } from "@application/entities/patient/patient";
import { AppointmentViewModel } from "./appointments-view-model";

export class PatientViewModel {
  static toHTTP(patient: Patient): PatientViewModel {
    return {
      id: patient.patientId,
      userId: patient.userId,
      name: patient.name,
      cpf: patient.cpf,
      caregiver: patient.caregiver,
      email: patient.email,
      phone: patient.phone,
      phone2: patient.phone2,
      sex: patient.sex,
      civilStatus: patient.civilStatus,
      birthDate: patient.birthDate,
      schooling: patient.schooling,
      addressCep: patient.addressCep,
      address: patient.address,
      number: patient.number,
      complement: patient.complement,
      district: patient.district,
      city: patient.city,
      state: patient.state,
      country: patient.country,
      comments: patient.comments,
      extraAttributes: [
        ...Object.entries(patient.attributes).map((v) => ({
          name: v[1].name,
          value: v[1].value,
        })),
      ],
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }
}