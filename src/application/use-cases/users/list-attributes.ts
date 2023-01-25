import { Attribute } from "@application/entities/attribute/attribute";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";

export class ListAttributesResponse {
  attributes: Attribute[]
}

@Injectable()
export class ListAttributesUseCase {
  constructor(
    private readonly attributesRepository: AttributesRepository,
  ) { }

  async execute(): Promise<ListAttributesResponse> {
    const attributes = await this.attributesRepository.findAll();

    return { attributes };
  }
}