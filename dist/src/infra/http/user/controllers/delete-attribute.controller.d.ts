import { DeleteAttributeUseCase } from "@application/use-cases/users/delete-attribute";
export declare class DeleteAttributeController {
    private readonly deleteAttribute;
    constructor(deleteAttribute: DeleteAttributeUseCase);
    handle(name: string): Promise<void>;
}
