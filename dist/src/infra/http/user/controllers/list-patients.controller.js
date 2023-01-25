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
exports.ListPatientsController = void 0;
const common_1 = require("@nestjs/common");
const parse_int_pipe_1 = require("../../../utils/pipes/parse-int.pipe");
const list_patients_1 = require("../../../../application/use-cases/users/list-patients");
const patient_view_model_1 = require("../view-models/patient-view-model");
const auth_1 = require("../../auth");
let ListPatientsController = class ListPatientsController {
    constructor(listPatients) {
        this.listPatients = listPatients;
    }
    async handle(page, search, attribute, sex) {
        const { patients } = await this.listPatients.execute({ page, search, attribute, sex });
        return Object.assign(Object.assign({}, patients), { items: patients.items.map(patient_view_model_1.PatientViewModel.toHTTP) });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', parse_int_pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('attribute')),
    __param(3, (0, common_1.Query)('sex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], ListPatientsController.prototype, "handle", null);
ListPatientsController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('patients'),
    __metadata("design:paramtypes", [list_patients_1.ListPatientsUseCase])
], ListPatientsController);
exports.ListPatientsController = ListPatientsController;
