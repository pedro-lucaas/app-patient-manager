
import { AttributesRepository } from '@application/repositories/attributes-repository';
import { PatientsRepository } from '@application/repositories/patients-repository';
import { Injectable } from '@nestjs/common';


export class ListNumberOfPatientsPerAttributeResponse {
  result: [string, number][];
}

@Injectable()
export class ListNumberOfPatientsPerAttributeUseCase {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly attributesRepository: AttributesRepository
  ) { }

  async execute(): Promise<ListNumberOfPatientsPerAttributeResponse> {
    const attributes = await this.attributesRepository.findAll();
    let result: [string, number][] = [];
    for (const attribute of attributes) {
      const number = await this.patientsRepository.countPatientsByAttribute(attribute.name);
      result.push([attribute.name, number]);
    }
    return { result };
  }
}