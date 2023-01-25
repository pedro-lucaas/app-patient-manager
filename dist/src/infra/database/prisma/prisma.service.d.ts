import { RegisterUser } from "@application/use-cases/admin/register-user";
import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private registerUser;
    constructor(registerUser: RegisterUser);
    onModuleInit(): Promise<void>;
    enableShutDownHooks(app: INestApplication): Promise<void>;
}
