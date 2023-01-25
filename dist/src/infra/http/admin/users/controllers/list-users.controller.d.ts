import { ListUsers } from "@application/use-cases/admin/list-users";
import { UserViewModel } from "../view-models/user-view-model";
export declare class ListUsersController {
    private listUsers;
    constructor(listUsers: ListUsers);
    handle(page: number): Promise<{
        items: UserViewModel[];
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    }>;
}
