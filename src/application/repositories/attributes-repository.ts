import { Attribute } from "@application/entities/attribute/attribute";

export abstract class AttributesRepository {
  abstract create(attributes: Attribute): Promise<void>;
  abstract findByName(name: string): Promise<Attribute | null>;
  abstract findAll(userId?: string): Promise<Attribute[]>;
  abstract delete(name: string): Promise<void>;
}