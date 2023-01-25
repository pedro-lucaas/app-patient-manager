import { ResetPassword } from "@application/use-cases/users/reset-password";
import { RegisterUserBody } from "../dtos/reset-password-body";
export declare class ResetPasswordController {
    private resetPassword;
    constructor(resetPassword: ResetPassword);
    handle(req: any, body: RegisterUserBody): Promise<void>;
}
