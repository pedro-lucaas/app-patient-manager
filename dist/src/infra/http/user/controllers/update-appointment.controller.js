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
exports.UpdateAppointmentController = void 0;
const update_appointment_1 = require("../../../../application/use-cases/users/update-appointment");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const update_appointment_body_1 = require("../dtos/update-appointment-body");
const auth_1 = require("../../auth");
let UpdateAppointmentController = class UpdateAppointmentController {
    constructor(updateAppointment) {
        this.updateAppointment = updateAppointment;
    }
    async update(appointmentId, body, files) {
        const { comments, initDate, endDate, price, procedure, paid } = body;
        try {
            await this.updateAppointment.update({
                appointmentId,
                initDate: initDate ? new Date(initDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                price,
                procedure,
                paid,
                comments,
                files,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async cancel(appointmentId, body) {
        const { cancelReason } = body;
        try {
            await this.updateAppointment.cancel({
                appointmentId,
                cancelReason,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async start(appointmentId) {
        try {
            await this.updateAppointment.start({
                appointmentId,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async finish(appointmentId) {
        try {
            await this.updateAppointment.finish({
                appointmentId,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_body_1.UpdateAppointmentBody,
        Array]),
    __metadata("design:returntype", Promise)
], UpdateAppointmentController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_body_1.CancelAppointmentBody]),
    __metadata("design:returntype", Promise)
], UpdateAppointmentController.prototype, "cancel", null);
__decorate([
    (0, common_1.Put)('start'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UpdateAppointmentController.prototype, "start", null);
__decorate([
    (0, common_1.Put)('finish'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UpdateAppointmentController.prototype, "finish", null);
UpdateAppointmentController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('appointment/:id'),
    __metadata("design:paramtypes", [update_appointment_1.UpdateAppointmentUseCase])
], UpdateAppointmentController);
exports.UpdateAppointmentController = UpdateAppointmentController;
