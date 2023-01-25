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
exports.CancelPatientController = void 0;
const cancel_pacient_1 = require("../../../../application/use-cases/users/cancel-pacient");
const common_1 = require("@nestjs/common");
const cancel_patient_body_1 = require("../dtos/cancel-patient-body");
const auth_1 = require("../../auth");
let CancelPatientController = class CancelPatientController {
    constructor(addPatient) {
        this.addPatient = addPatient;
    }
    async handle(body) {
        const { patientId } = body;
        try {
            await this.addPatient.execute({ patientId });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cancel_patient_body_1.CancelPatientBody]),
    __metadata("design:returntype", Promise)
], CancelPatientController.prototype, "handle", null);
CancelPatientController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('patient/cancel'),
    __metadata("design:paramtypes", [cancel_pacient_1.CancelPatientUseCase])
], CancelPatientController);
exports.CancelPatientController = CancelPatientController;