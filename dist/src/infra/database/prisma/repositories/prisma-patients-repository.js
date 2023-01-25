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
exports.PrismaPatientsRepository = void 0;
const config_1 = require("../../../../config/config");
const Pagination_1 = require("../../../../helpers/Pagination");
const common_1 = require("@nestjs/common");
const prisma_patient_attributes_mapper_1 = require("../mappers/prisma-patient-attributes-mapper");
const prisma_patients_mapper_1 = require("../mappers/prisma-patients-mapper");
const prisma_service_1 = require("../prisma.service");
let PrismaPatientsRepository = class PrismaPatientsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(patient) {
        console.log(patient.attributes);
        await this.prisma.patient.create({
            data: Object.assign(Object.assign({}, prisma_patients_mapper_1.PrismaPatientsMapper.toPrisma(patient)), { patientAttributes: {
                    create: patient.attributes.map(prisma_patient_attributes_mapper_1.PrismaPatientAttributesMapper.toPrisma),
                } }),
        });
    }
    async findById(patientId) {
        return await this.prisma.patient.findUnique({
            where: {
                id: patientId,
            },
            include: { patientAttributes: true },
        })
            .then(prisma_patients_mapper_1.PrismaPatientsMapper.toDomain);
    }
    async findByEmail(email) {
        return await this.prisma.patient.findUnique({
            where: {
                email,
            },
            include: { patientAttributes: true },
        }).then(prisma_patients_mapper_1.PrismaPatientsMapper.toDomain);
    }
    async findAll(page = 1, search, attributeName, sex, userId) {
        const total = await this.prisma.patient.count();
        return await this.prisma.patient.findMany({
            where: {
                userId,
                OR: search && [
                    { name: { contains: search } },
                    { email: { contains: search } },
                    { phone: { contains: search } },
                ],
                patientAttributes: attributeName && {
                    some: {
                        name: attributeName,
                        value: true,
                    }
                },
                sex: sex && {
                    equals: sex,
                },
            },
            skip: (page - 1) * config_1.PAGE_SIZE,
            take: config_1.PAGE_SIZE,
            include: { patientAttributes: true },
        }).then(patients => patients.map(prisma_patients_mapper_1.PrismaPatientsMapper.toDomain))
            .then(patients => new Pagination_1.Pagination(patients, total, page));
    }
    async save(patient) {
        await this.prisma.patient.update({
            where: {
                id: patient.patientId,
            },
            data: Object.assign(Object.assign({}, prisma_patients_mapper_1.PrismaPatientsMapper.toPrisma(patient)), { patientAttributes: {
                    upsert: patient.attributes.map((attribute) => ({
                        where: {
                            patientId_name: {
                                patientId: patient.patientId,
                                name: attribute.name,
                            },
                        },
                        update: prisma_patient_attributes_mapper_1.PrismaPatientAttributesMapper.toPrisma(attribute),
                        create: prisma_patient_attributes_mapper_1.PrismaPatientAttributesMapper.toPrisma(attribute),
                    })),
                } }),
        });
    }
    async countPatientsByAttribute(attributeName, userId) {
        return await this.prisma.patient.count({
            where: {
                patientAttributes: {
                    some: {
                        name: attributeName,
                        value: true,
                    }
                }
            }
        });
    }
};
PrismaPatientsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaPatientsRepository);
exports.PrismaPatientsRepository = PrismaPatientsRepository;
