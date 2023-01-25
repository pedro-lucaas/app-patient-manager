import { User } from "@application/entities/user/user";
import { Pagination } from "@helpers/Pagination";
export declare abstract class UsersRepository {
    abstract create(User: User): Promise<void>;
    abstract findById(userId: string): Promise<User | null>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findAll(page?: number): Promise<Pagination<User>>;
    abstract save(user: User): Promise<void>;
    abstract countForRole(roleName: string): Promise<number>;
}
