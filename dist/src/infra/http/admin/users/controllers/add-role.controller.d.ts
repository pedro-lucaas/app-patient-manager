import { AddRoleToUser } from "@application/use-cases/admin/add-role-to-user";
import { AddRoleToUserBody } from "../dtos/add-role-to-user-body";
export declare class AddRoleToUserController {
    private addRoleToUser;
    constructor(addRoleToUser: AddRoleToUser);
    handle(body: AddRoleToUserBody): Promise<void>;
}
