import { ListAttributesUseCase } from "@application/use-cases/users/list-attributes";
import { AttributeViewModel } from "../view-models/attributes-view-model";
export declare class ListAttributesController {
    private listAttributes;
    constructor(listAttributes: ListAttributesUseCase);
    handle(): Promise<{
        items: AttributeViewModel[];
    }>;
}
