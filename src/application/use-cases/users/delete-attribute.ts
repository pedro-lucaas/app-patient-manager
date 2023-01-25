import { Attribute } from "@application/entities/attribute/attribute";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { Injectable } from "@nestjs/common";

export class DeleteAttributeRequest {
  name: string;
}

@Injectable()
export class DeleteAttributeUseCase {
  constructor(
    private readonly attributesRepository: AttributesRepository,
  ) { }

  async execute(request: DeleteAttributeRequest): Promise<void> {
    const { name } = request;
    const attribute = await this.attributesRepository.findByName(name);
    if (!attribute) {
      throw new Error("Attribute not found")
    }
    if (attribute.patients.length !== 0) {
      throw new Error("Attribute has patients")
    }

    this.attributesRepository.delete(name)
  }
}