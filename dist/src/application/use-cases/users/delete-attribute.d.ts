import { AttributesRepository } from "@application/repositories/attributes-repository";
export declare class DeleteAttributeRequest {
    name: string;
}
export declare class DeleteAttributeUseCase {
    private readonly attributesRepository;
    constructor(attributesRepository: AttributesRepository);
    execute(request: DeleteAttributeRequest): Promise<void>;
}
