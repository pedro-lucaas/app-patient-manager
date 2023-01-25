import { RefreshToken } from "@application/use-cases/users/refresh-token";
import { RefreshTokenBody } from "../dtos/refresh-token-body";
export declare class RefreshTokenController {
    private readonly refreshToken;
    constructor(refreshToken: RefreshToken);
    handle(body: RefreshTokenBody): Promise<import("@application/use-cases/users/refresh-token").RefreshTokenResponse>;
}
