import { UsersRepository } from "@application/repositories/users-repository";
export declare class RemoveRoleFromUserRequest {
    userId: string;
    roleName: string;
}
export declare class RemoveRoleFromUser {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(request: RemoveRoleFromUserRequest): Promise<void>;
}
