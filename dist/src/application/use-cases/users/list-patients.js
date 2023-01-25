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
exports.ListPatientsUseCase = exports.ListPatientsResponse = exports.ListPatientsRequest = void 0;
const patients_repository_1 = require("../../repositories/patients-repository");
const common_1 = require("@nestjs/common");
class ListPatientsRequest {
}
exports.ListPatientsRequest = ListPatientsRequest;
class ListPatientsResponse {
}
exports.ListPatientsResponse = ListPatientsResponse;
let ListPatientsUseCase = class ListPatientsUseCase {
    constructor(patientsRepository) {
        this.patientsRepository = patientsRepository;
    }
    async execute(request) {
        let { page, search, attribute, sex } = request;
        search = search || undefined;
        page = page || 1;
        attribute = attribute || undefined;
        sex = sex || undefined;
        const patients = await this.patientsRepository.findAll(page, search, attribute, sex);
        return { patients };
    }
};
ListPatientsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patients_repository_1.PatientsRepository])
], ListPatientsUseCase);
exports.ListPatientsUseCase = ListPatientsUseCase;
