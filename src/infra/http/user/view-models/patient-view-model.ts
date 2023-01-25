import { Patient } from "@application/entities/patient/patient";
import { AppointmentViewModel } from "./appointments-view-model";

export class PatientViewModel {
  static toHTTP(patient: Patient): PatientViewModel {
    return {
      id: patient.patientId,
      userId: patient.userId,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      sex: patient.sex,
      birthDate: patient.birthDate,
      comments: patient.comments,
      ...Object.entries(patient.attributes).reduce((a, v) => ({ ...a, [v[1].name]: v[1].value }), {}),
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }
}