import { UsersRepository } from "@application/repositories/users-repository";
import { JwtService } from "@nestjs/jwt";
export declare class LoginRequest {
    email: string;
    password: string;
}
export declare class LoginResponse {
    access_token: string;
    refresh_token: string;
}
export declare class Login {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    execute(request: LoginRequest): Promise<LoginResponse>;
}
