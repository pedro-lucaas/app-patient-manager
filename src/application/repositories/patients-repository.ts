import { Patient } from "@application/entities/patient/patient";
import { Pagination } from "@helpers/Pagination";

export abstract class PatientsRepository {
  abstract create(patient: Patient): Promise<void>;
  abstract findById(patientId: string): Promise<Patient | null>;
  abstract findByEmail(email: string): Promise<Patient | null>;
  abstract findAll(page?: number, search?: string, attributeName?: string, sex?: string, userId?: string): Promise<Pagination<Patient>>;
  abstract save(patient: Patient): Promise<void>;
  abstract countPatientsByAttribute(attributeName: string, userId?: string): Promise<number>;
}