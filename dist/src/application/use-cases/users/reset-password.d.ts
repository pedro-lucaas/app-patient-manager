import { UsersRepository } from "@application/repositories/users-repository";
export declare class ResetPasswordRequest {
    userId: string;
    password: string;
    newPassword: string;
}
export declare class ResetPassword {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(request: ResetPasswordRequest): Promise<void>;
}
