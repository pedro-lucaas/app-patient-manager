"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsersRepository = void 0;
const config_1 = require("../../../../config/config");
const Pagination_1 = require("../../../../helpers/Pagination");
const common_1 = require("@nestjs/common");
const prisma_user_mapper_1 = require("../mappers/prisma-user-mapper");
const prisma_service_1 = require("../prisma.service");
let PrismaUsersRepository = class PrismaUsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        const raw = prisma_user_mapper_1.PrismaUserMapper.toPrisma(user);
        await this.prisma.users.create({
            data: Object.assign(Object.assign({}, raw), { roles: { create: raw.roles.connectOrCreate.map(role => role.create) }, UserConfig: {
                    create: {}
                } }),
        });
    }
    async findById(id) {
        return this.prisma.users.findUnique({
            where: {
                id,
            },
            include: { roles: true }
        }).then(prisma_user_mapper_1.PrismaUserMapper.toDomain);
    }
    async findByEmail(email) {
        return await this.prisma.users.findUnique({
            where: {
                email,
            },
            include: { roles: true }
        }).then(prisma_user_mapper_1.PrismaUserMapper.toDomain);
    }
    async findAll(page = 1) {
        const total = await this.prisma.users.count();
        return this.prisma.users.findMany({
            skip: (page - 1) * config_1.PAGE_SIZE,
            take: config_1.PAGE_SIZE,
            include: { roles: true }
        }).then(users => users.map(prisma_user_mapper_1.PrismaUserMapper.toDomain))
            .then(users => new Pagination_1.Pagination(users, total, page));
    }
    async save(user) {
        await this.prisma.users.update({
            where: {
                id: user.userId,
            },
            data: prisma_user_mapper_1.PrismaUserMapper.toPrisma(user),
        });
    }
    async countForRole(role) {
        return this.prisma.users.count({
            where: {
                roles: {
                    some: {
                        role,
                    },
                },
            },
        });
    }
};
PrismaUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUsersRepository);
exports.PrismaUsersRepository = PrismaUsersRepository;
