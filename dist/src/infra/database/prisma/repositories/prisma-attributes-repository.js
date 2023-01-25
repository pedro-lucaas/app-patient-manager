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
exports.PrismaAttributesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_attributes_mapper_1 = require("../mappers/prisma-attributes-mapper");
const prisma_service_1 = require("../prisma.service");
let PrismaAttributesRepository = class PrismaAttributesRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(attributes) {
        await this.prisma.attributes.create({
            data: Object.assign({}, prisma_attributes_mapper_1.PrismaAttributesMapper.toPrisma(attributes)),
        });
    }
    async findByName(attributeName) {
        return await this.prisma.attributes.findFirst({
            where: {
                name: attributeName,
            },
            include: {
                patientAttributes: { where: { value: true } },
            },
        }).then(prisma_attributes_mapper_1.PrismaAttributesMapper.toDomain);
    }
    async findAll() {
        return await this.prisma.attributes.findMany()
            .then(attributes => attributes.map(prisma_attributes_mapper_1.PrismaAttributesMapper.toDomain));
    }
    async delete(attributeName) {
        await this.prisma.patientAttributes.deleteMany({
            where: {
                name: attributeName,
            }
        });
        await this.prisma.attributes.delete({
            where: {
                name: attributeName,
            }
        });
    }
};
PrismaAttributesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAttributesRepository);
exports.PrismaAttributesRepository = PrismaAttributesRepository;
