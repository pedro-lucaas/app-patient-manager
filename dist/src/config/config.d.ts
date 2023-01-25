import { Role } from "@infra/http/auth/roles/role.enum";
export declare const jwtOptions: {
    secret: string;
    signOptions: {
        expiresIn: string;
    };
};
export declare const REFRESH_TOKEN_EXPIRES_IN = "7d";
export declare const PAGE_SIZE = 10;
export declare const USER_ROOT: {
    name: string;
    email: string;
    phone: string;
    password: string;
    roles: Role[];
};
