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
exports.FindPatientUseCase = exports.FindPatientResponse = exports.FindPatientRequest = void 0;
const patients_repository_1 = require("../../repositories/patients-repository");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
class FindPatientRequest {
}
exports.FindPatientRequest = FindPatientRequest;
class FindPatientResponse {
}
exports.FindPatientResponse = FindPatientResponse;
let FindPatientUseCase = class FindPatientUseCase {
    constructor(patientsRepository) {
        this.patientsRepository = patientsRepository;
    }
    async execute(request) {
        let { id } = request;
        try {
            const patient = await this.patientsRepository.findById(id);
            return { patient };
        }
        catch (error) {
            throw new exceptions_1.HttpException("Patient not found", 404);
        }
    }
};
FindPatientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patients_repository_1.PatientsRepository])
], FindPatientUseCase);
exports.FindPatientUseCase = FindPatientUseCase;
