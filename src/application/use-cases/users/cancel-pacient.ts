import { PatientsRepository } from "@application/repositories/patients-repository";
import { Injectable } from "@nestjs/common";

export class CancelPatientRequest {
  patientId: string;
}

@Injectable()
export class CancelPatientUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
  ) { }

  async execute(request: CancelPatientRequest): Promise<void> {
    const { patientId } = request;
    const patient = await this.patientsRepository.findById(patientId)

    patient.cancel()

    this.patientsRepository.save(patient);
  }
}