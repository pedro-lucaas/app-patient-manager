import { Attribute } from "@application/entities/attribute/attribute";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { Injectable } from "@nestjs/common";

export class CreateAttributeRequest {
  name: string;
}

@Injectable()
export class CreateAttributeUseCase {
  constructor(
    private readonly attributesRepository: AttributesRepository,
  ) { }

  async execute(request: CreateAttributeRequest): Promise<void> {
    const { name } = request;
    const attribute = await this.attributesRepository.findByName(name);

    if (attribute) {
      throw new Error("Attribute already exist")
    }


    const newAttribute = new Attribute({
      name,
    })

    this.attributesRepository.create(newAttribute)
  }
}