import { UsersRepository } from "@application/repositories/users-repository";
export declare class AddRoleToUserRequest {
    userId: string;
    roleName: string;
}
export declare class AddRoleToUser {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(request: AddRoleToUserRequest): Promise<void>;
}
