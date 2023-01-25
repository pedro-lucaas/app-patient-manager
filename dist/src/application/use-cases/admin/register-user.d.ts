import { UsersRepository } from "@application/repositories/users-repository";
export declare class RegisterUserRequest {
    name: string;
    email: string;
    phone: string;
    password?: string;
    roles?: string[];
}
export declare class RegisterUser {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    execute(request: RegisterUserRequest): Promise<void>;
}
