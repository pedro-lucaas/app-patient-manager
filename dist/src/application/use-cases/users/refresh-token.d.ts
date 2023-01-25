import { UsersRepository } from "@application/repositories/users-repository";
import { JwtService } from "@nestjs/jwt";
export declare class RefreshTokenRequest {
    refreshToken: string;
}
export declare class RefreshTokenResponse {
    access_token: string;
    refresh_token: string;
}
export declare class RefreshToken {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse>;
}
