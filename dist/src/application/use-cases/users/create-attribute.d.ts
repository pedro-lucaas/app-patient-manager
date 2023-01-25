import { AttributesRepository } from "@application/repositories/attributes-repository";
export declare class CreateAttributeRequest {
    name: string;
}
export declare class CreateAttributeUseCase {
    private readonly attributesRepository;
    constructor(attributesRepository: AttributesRepository);
    execute(request: CreateAttributeRequest): Promise<void>;
}
