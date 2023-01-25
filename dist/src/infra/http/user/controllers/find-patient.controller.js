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
exports.FindPatientController = void 0;
const common_1 = require("@nestjs/common");
const find_patient_1 = require("../../../../application/use-cases/users/find-patient");
const patient_view_model_1 = require("../view-models/patient-view-model");
const auth_1 = require("../../auth");
let FindPatientController = class FindPatientController {
    constructor(findPatient) {
        this.findPatient = findPatient;
    }
    async handle(id) {
        const { patient } = await this.findPatient.execute({ id });
        return patient_view_model_1.PatientViewModel.toHTTP(patient);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FindPatientController.prototype, "handle", null);
FindPatientController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('patient/:id'),
    __metadata("design:paramtypes", [find_patient_1.FindPatientUseCase])
], FindPatientController);
exports.FindPatientController = FindPatientController;
