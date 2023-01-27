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
exports.ListAppointmentsUseCase = exports.ListAppointmentsResponse = exports.ListAppointmentsRequest = void 0;
const appointments_repository_1 = require("../../repositories/appointments-repository");
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
class ListAppointmentsRequest {
}
exports.ListAppointmentsRequest = ListAppointmentsRequest;
class ListAppointmentsResponse {
}
exports.ListAppointmentsResponse = ListAppointmentsResponse;
let ListAppointmentsUseCase = class ListAppointmentsUseCase {
    constructor(appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }
    async execute(request) {
        const { status, initDate, endDate } = request;
        const appointments = await this.appointmentsRepository.findMany(status, (0, date_fns_1.isValid)(initDate) ? initDate : undefined, (0, date_fns_1.isValid)(endDate) ? endDate : undefined);
        return { appointments };
    }
};
ListAppointmentsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [appointments_repository_1.AppointmentsRepository])
], ListAppointmentsUseCase);
exports.ListAppointmentsUseCase = ListAppointmentsUseCase;
