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
exports.ListPatientAppointmentsController = void 0;
const list_patient_appointments_1 = require("../../../../application/use-cases/users/list-patient-appointments");
const common_1 = require("@nestjs/common");
const auth_1 = require("../../auth");
const appointments_view_model_1 = require("../view-models/appointments-view-model");
const parse_int_pipe_1 = require("../../../utils/pipes/parse-int.pipe");
let ListPatientAppointmentsController = class ListPatientAppointmentsController {
    constructor(listPatientAppointmentsUseCase) {
        this.listPatientAppointmentsUseCase = listPatientAppointmentsUseCase;
    }
    async handle(patientId, page, limit) {
        try {
            const { appointments } = await this.listPatientAppointmentsUseCase.execute({
                patientId,
                page,
                limit,
            });
            return Object.assign(Object.assign({}, appointments), { items: appointments.items.map(appointments_view_model_1.AppointmentViewModel.toHTTP) });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page', parse_int_pipe_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ListPatientAppointmentsController.prototype, "handle", null);
ListPatientAppointmentsController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('patient/:id/appointments'),
    __metadata("design:paramtypes", [list_patient_appointments_1.ListPatientAppointmentsUseCase])
], ListPatientAppointmentsController);
exports.ListPatientAppointmentsController = ListPatientAppointmentsController;
