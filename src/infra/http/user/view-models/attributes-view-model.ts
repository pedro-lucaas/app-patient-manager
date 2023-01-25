import { Attribute } from "@application/entities/attribute/attribute";

export class AttributeViewModel {
  static toHTTP(attribute: Attribute): AttributeViewModel {
    return {
      name: attribute.name,
    };
  }
}