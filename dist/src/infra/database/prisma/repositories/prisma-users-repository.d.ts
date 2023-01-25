import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { Pagination } from "@helpers/Pagination";
import { Role } from "@infra/http/auth/roles/role.enum";
import { PrismaService } from "../prisma.service";
export declare class PrismaUsersRepository implements UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: User): Promise<void>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(page?: number): Promise<Pagination<User>>;
    save(user: User): Promise<void>;
    countForRole(role: Role): Promise<number>;
}
