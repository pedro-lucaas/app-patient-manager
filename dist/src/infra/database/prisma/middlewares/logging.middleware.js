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
exports.LoggerMiddleware = void 0;
const s3_service_1 = require("../../../../application/services/s3-service");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(prisma, s3) {
        this.prisma = prisma;
        this.s3 = s3;
    }
    use(req, res, next) {
        this.prisma.$use(async (params, next) => {
            if (params.model && params.model == 'AppointmentsFiles') {
                if (params.action == 'delete') {
                    const file = await this.prisma.appointmentsFiles.findUnique({
                        where: params.args.where
                    });
                    if (file) {
                        await this.s3.deleteFile(file.fileName);
                    }
                }
                if (params.action == 'deleteMany') {
                    const files = await this.prisma.appointmentsFiles.findMany({
                        where: params.args.where
                    });
                    for (const file of files) {
                        await this.s3.deleteFile(file.fileName);
                    }
                }
            }
            return next(params);
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        s3_service_1.S3Service])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
