import { CreateAttributeUseCase } from "@application/use-cases/users/create-attribute";
import { CreateAttributeBody } from "../dtos/create-attribute-body";
export declare class CreateAttributeController {
    private readonly createAttribute;
    constructor(createAttribute: CreateAttributeUseCase);
    handle(body: CreateAttributeBody): Promise<void>;
}
