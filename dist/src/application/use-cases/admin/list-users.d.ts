import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { Pagination } from "@helpers/Pagination";
export declare class ListUsersResponse {
    users: Pagination<User>;
}
export declare class ListUsers {
    private userRepository;
    constructor(userRepository: UsersRepository);
    execute(page?: number): Promise<ListUsersResponse>;
}
