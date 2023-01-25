import { Attribute } from "@application/entities/attribute/attribute";
import { AttributesRepository } from "@application/repositories/attributes-repository";
export declare class ListAttributesResponse {
    attributes: Attribute[];
}
export declare class ListAttributesUseCase {
    private readonly attributesRepository;
    constructor(attributesRepository: AttributesRepository);
    execute(): Promise<ListAttributesResponse>;
}
