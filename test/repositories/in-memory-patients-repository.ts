import { Patient } from "@application/entities/patient/patient";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Pagination } from "@helpers/Pagination";

export class InMemoryPatientsRepository implements PatientsRepository {
  public patients: Patient[] = [];

  async create(patient: Patient): Promise<void> {
    this.patients.push(patient);
  }

  async findById(patientId: string): Promise<Patient> {
    return this.patients.find((patient) => patient.patientId === patientId) || null;
  }

  async findAll(page?: number): Promise<Pagination<Patient>> {
    return new Pagination<Patient>(this.patients, this.patients.length, page);
  }

  async save(patient: Patient): Promise<void> {
    const index = this.patients.findIndex((c) => c.patientId === patient.patientId);
    this.patients[index] = patient;
  }
}