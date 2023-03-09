import { Patient } from "@application/entities/patient/patient";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";

export class FindPatientRequest {
  id?: string;
}

export class FindPatientResponse {
  patient: Patient
}

@Injectable()
export class FindPatientUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
  ) { }

  async execute(request: FindPatientRequest): Promise<FindPatientResponse> {
    let { id } = request;
    const patient = await this.patientsRepository.findById(id);
    return { patient };
  }
}