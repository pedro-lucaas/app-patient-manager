"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const users_repository_1 = require("../../application/repositories/users-repository");
const prisma_users_repository_1 = require("./prisma/repositories/prisma-users-repository");
const register_user_1 = require("../../application/use-cases/admin/register-user");
const patients_repository_1 = require("../../application/repositories/patients-repository");
const prisma_patients_repository_1 = require("./prisma/repositories/prisma-patients-repository");
const attributes_repository_1 = require("../../application/repositories/attributes-repository");
const prisma_attributes_repository_1 = require("./prisma/repositories/prisma-attributes-repository");
const appointments_repository_1 = require("../../application/repositories/appointments-repository");
const prisma_appointments_repository_1 = require("./prisma/repositories/prisma-appointments-repository");
const logging_middleware_1 = require("./prisma/middlewares/logging.middleware");
const s3_service_1 = require("../../application/services/s3-service");
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    configure(consumer) {
        consumer.apply(logging_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
DatabaseModule = DatabaseModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            DatabaseModule_1,
        ],
        providers: [
            prisma_service_1.PrismaService,
            register_user_1.RegisterUser,
            s3_service_1.S3Service,
            {
                provide: users_repository_1.UsersRepository,
                useClass: prisma_users_repository_1.PrismaUsersRepository,
            },
            {
                provide: patients_repository_1.PatientsRepository,
                useClass: prisma_patients_repository_1.PrismaPatientsRepository,
            },
            {
                provide: attributes_repository_1.AttributesRepository,
                useClass: prisma_attributes_repository_1.PrismaAttributesRepository,
            },
            {
                provide: appointments_repository_1.AppointmentsRepository,
                useClass: prisma_appointments_repository_1.PrismaAppointmentsRepository,
            }
        ],
        exports: [
            users_repository_1.UsersRepository,
            patients_repository_1.PatientsRepository,
            attributes_repository_1.AttributesRepository,
            appointments_repository_1.AppointmentsRepository,
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
