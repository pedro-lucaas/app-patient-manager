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
exports.ListNumberOfPatientsPerAttributeUseCase = exports.ListNumberOfPatientsPerAttributeResponse = void 0;
const attributes_repository_1 = require("../../repositories/attributes-repository");
const patients_repository_1 = require("../../repositories/patients-repository");
const common_1 = require("@nestjs/common");
class ListNumberOfPatientsPerAttributeResponse {
}
exports.ListNumberOfPatientsPerAttributeResponse = ListNumberOfPatientsPerAttributeResponse;
let ListNumberOfPatientsPerAttributeUseCase = class ListNumberOfPatientsPerAttributeUseCase {
    constructor(patientsRepository, attributesRepository) {
        this.patientsRepository = patientsRepository;
        this.attributesRepository = attributesRepository;
    }
    async execute() {
        const attributes = await this.attributesRepository.findAll();
        let result = [];
        for (const attribute of attributes) {
            const number = await this.patientsRepository.countPatientsByAttribute(attribute.name);
            result.push([attribute.name, number]);
        }
        return { result };
    }
};
ListNumberOfPatientsPerAttributeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patients_repository_1.PatientsRepository,
        attributes_repository_1.AttributesRepository])
], ListNumberOfPatientsPerAttributeUseCase);
exports.ListNumberOfPatientsPerAttributeUseCase = ListNumberOfPatientsPerAttributeUseCase;
