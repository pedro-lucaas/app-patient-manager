import { User } from "@application/entities/user/user";
export declare class PrismaUserMapper {
    static toPrisma(user: User): {
        id: string;
        name: string;
        phone: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        canceledAt: Date;
        refreshToken: string;
        roles: {
            connectOrCreate: {
                create: {
                    role: string;
                };
                where: {
                    userId_role: {
                        userId: string;
                        role: string;
                    };
                };
            }[];
            deleteMany: {
                role: {
                    notIn: string[];
                };
            };
        };
    };
    static toDomain(raw: any): User;
}
