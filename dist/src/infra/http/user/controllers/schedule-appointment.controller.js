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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleAppointmentsController = void 0;
const schedule_appointment_1 = require("../../../../application/use-cases/users/schedule-appointment");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const schedule_appointment_body_1 = require("../dtos/schedule-appointment-body");
const auth_1 = require("../../auth");
const decorators_1 = require("@nestjs/common/decorators");
let ScheduleAppointmentsController = class ScheduleAppointmentsController {
    constructor(scheduleAppointmentsUseCase) {
        this.scheduleAppointmentsUseCase = scheduleAppointmentsUseCase;
    }
    async handle(body, req, files) {
        const { patientId, initDate, endDate, price, procedure, paid } = body;
        const userId = req.user.sub;
        try {
            await this.scheduleAppointmentsUseCase.execute({
                patientId,
                userId,
                price,
                procedure,
                paid,
                initDate: new Date(initDate),
                endDate: new Date(endDate),
                files,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.Req)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schedule_appointment_body_1.ScheduleAppointmentBody, Object, Array]),
    __metadata("design:returntype", Promise)
], ScheduleAppointmentsController.prototype, "handle", null);
ScheduleAppointmentsController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('/appointment'),
    __metadata("design:paramtypes", [schedule_appointment_1.ScheduleAppointmentsUseCase])
], ScheduleAppointmentsController);
exports.ScheduleAppointmentsController = ScheduleAppointmentsController;
