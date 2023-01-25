import { RegisterUser } from '@application/use-cases/admin/register-user';
import { RegisterUserBody } from '../dtos/register-user-body';
export declare class RegisterUserController {
    private registerUser;
    constructor(registerUser: RegisterUser);
    handle(request: RegisterUserBody): Promise<void>;
}
