import { RegisterUser } from "@application/use-cases/admin/register-user";
export declare class RootUser {
    static create(registerUser: RegisterUser): Promise<void>;
}
