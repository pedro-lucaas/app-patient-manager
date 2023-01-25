import { Patient } from "@application/entities/patient/patient";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";

export class ListPatientsRequest {
  page?: number;
  search?: string;
  attribute?: string;
  sex?: string;
}

export class ListPatientsResponse {
  patients: Pagination<Patient>
}

@Injectable()
export class ListPatientsUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
  ) { }

  async execute(request: ListPatientsRequest): Promise<ListPatientsResponse> {
    let { page, search, attribute, sex } = request;

    search = search || undefined;
    page = page || 1;
    attribute = attribute || undefined;
    sex = sex || undefined;

    const patients = await this.patientsRepository.findAll(page, search, attribute, sex
    );

    return { patients };
  }
}