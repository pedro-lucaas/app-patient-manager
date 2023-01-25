import { RemoveRoleFromUser } from "@application/use-cases/admin/remove-role-from-user";
import { RemoveRoleFromUserBody } from "../dtos/remove-role-from-user-body";
export declare class RemoveRoleFromUserController {
    private removeRoleFromUser;
    constructor(removeRoleFromUser: RemoveRoleFromUser);
    handle(body: RemoveRoleFromUserBody): Promise<void>;
}
