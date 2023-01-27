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
exports.PrismaAppointmentsRepository = void 0;
const appointment_1 = require("../../../../application/entities/appointment/appointment");
const config_1 = require("../../../../config/config");
const Pagination_1 = require("../../../../helpers/Pagination");
const common_1 = require("@nestjs/common");
const prisma_appointments_files_mapper_1 = require("../mappers/prisma-appointments-files-mapper");
const prisma_appointments_mapper_1 = require("../mappers/prisma-appointments-mapper");
const prisma_service_1 = require("../prisma.service");
let PrismaAppointmentsRepository = class PrismaAppointmentsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(appointment) {
        await this.prisma.appointments.create({
            data: prisma_appointments_mapper_1.PrismaAppointmentsMapper.toPrisma(appointment),
        });
        for (const file of appointment.files) {
            await this.prisma.appointmentsFiles.create({
                data: prisma_appointments_files_mapper_1.PrismaAppointmentsFilesMapper.toPrisma(file),
            });
        }
    }
    async findByDate(initDate, endDate) {
        return await this.prisma.appointments.findFirst({
            where: {
                OR: [
                    {
                        initDate: { gte: initDate, lte: endDate },
                    },
                    {
                        endDate: { gte: initDate, lte: endDate },
                    }
                ],
                status: { not: appointment_1.AppointmentStatus.CANCELED },
            },
            include: { patient: true },
        }).then(prisma_appointments_mapper_1.PrismaAppointmentsMapper.toDomain);
    }
    async findById(appointmentId) {
        return await this.prisma.appointments.findUnique({
            where: {
                id: appointmentId,
            },
        }).then(prisma_appointments_mapper_1.PrismaAppointmentsMapper.toDomain);
    }
    async findStartedAppointment() {
        return await this.prisma.appointments.findFirst({
            where: {
                status: appointment_1.AppointmentStatus.STARTED,
            },
        }).then(prisma_appointments_mapper_1.PrismaAppointmentsMapper.toDomain);
    }
    async findManyByPatientId(patientId, page = 1, limit = config_1.PAGE_SIZE) {
        const total = await this.prisma.appointments.count({
            where: {
                patientId,
            },
        });
        return await this.prisma.appointments.findMany({
            where: {
                patientId,
            },
            orderBy: {
                initDate: 'desc',
            },
            skip: (page - 1) * limit,
            take: limit,
            include: { AppointmentsFiles: true }
        }).then(appointments => appointments.map(prisma_appointments_mapper_1.PrismaAppointmentsMapper.toDomain))
            .then(appointments => new Pagination_1.Pagination(appointments, total, page, limit));
    }
    async findMany(status, initDate, endDate) {
        return await this.prisma.appointments.findMany({
            where: {
                status: status,
                OR: [
                    {
                        initDate: { gte: initDate, lte: endDate },
                    },
                    {
                        endDate: { gte: initDate, lte: endDate },
                    }
                ],
            },
            orderBy: {
                initDate: 'asc',
            },
            include: { AppointmentsFiles: true, patient: true }
        }).then(appointments => appointments.map(prisma_appointments_mapper_1.PrismaAppointmentsMapper.toDomain));
    }
    async delete(appointmentId) {
        await this.prisma.appointments.delete({
            where: {
                id: appointmentId,
            },
        });
    }
    async save(appointment) {
        await this.prisma.appointments.update({
            where: {
                id: appointment.appointmentId,
            },
            data: prisma_appointments_mapper_1.PrismaAppointmentsMapper.toPrisma(appointment),
        });
        if (!appointment.files || appointment.files.length === 0)
            return;
        for (const file of appointment.files) {
            await this.prisma.appointmentsFiles.upsert({
                where: {
                    fileUrl: file.fileUrl,
                },
                create: prisma_appointments_files_mapper_1.PrismaAppointmentsFilesMapper.toPrisma(file),
                update: prisma_appointments_files_mapper_1.PrismaAppointmentsFilesMapper.toPrisma(file),
            });
        }
        await this.prisma.appointmentsFiles.deleteMany({
            where: {
                fileName: { notIn: appointment.files.map(file => file.fileName) },
            },
        });
    }
};
PrismaAppointmentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaAppointmentsRepository);
exports.PrismaAppointmentsRepository = PrismaAppointmentsRepository;
