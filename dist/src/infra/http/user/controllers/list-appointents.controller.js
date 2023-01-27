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
exports.ListAppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../../auth");
const appointments_view_model_1 = require("../view-models/appointments-view-model");
const list_patient_appointments_query_1 = require("../dtos/list-patient-appointments-query");
const list_appointments_1 = require("../../../../application/use-cases/users/list-appointments");
let ListAppointmentsController = class ListAppointmentsController {
    constructor(listAppointmentsUseCase) {
        this.listAppointmentsUseCase = listAppointmentsUseCase;
    }
    async handle(query) {
        const { appointments } = await this.listAppointmentsUseCase.execute({
            initDate: new Date(query.initDate),
            endDate: new Date(query.endDate),
            status: query.status,
        });
        return {
            items: appointments.map(appointments_view_model_1.AppointmentViewModel.toHTTP),
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_patient_appointments_query_1.ListPatientAppointmentsQuery]),
    __metadata("design:returntype", Promise)
], ListAppointmentsController.prototype, "handle", null);
ListAppointmentsController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('appointments'),
    __metadata("design:paramtypes", [list_appointments_1.ListAppointmentsUseCase])
], ListAppointmentsController);
exports.ListAppointmentsController = ListAppointmentsController;
