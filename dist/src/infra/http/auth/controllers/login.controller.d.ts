import { Login } from "@application/use-cases/users/login";
import { LoginBody } from "../dtos/login-body";
export declare class LoginController {
    private readonly login;
    constructor(login: Login);
    handle(body: LoginBody): Promise<import("@application/use-cases/users/login").LoginResponse>;
}
