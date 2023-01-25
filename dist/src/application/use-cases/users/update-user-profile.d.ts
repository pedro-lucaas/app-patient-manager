import { UsersRepository } from "@application/repositories/users-repository";
export declare class UpdateUserProfileRequest {
    userId: string;
    name?: string;
    phone?: string;
}
export declare class UpdateUserProfile {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(request: UpdateUserProfileRequest): Promise<void>;
}
