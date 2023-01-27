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
exports.CreatePatientUseCase = exports.CreatePatientRequest = void 0;
const patient_1 = require("../../entities/patient/patient");
const attributes_repository_1 = require("../../repositories/attributes-repository");
const patients_repository_1 = require("../../repositories/patients-repository");
const common_1 = require("@nestjs/common");
class CreatePatientRequest {
}
exports.CreatePatientRequest = CreatePatientRequest;
let CreatePatientUseCase = class CreatePatientUseCase {
    constructor(patientsRepository, attributesRepository) {
        this.patientsRepository = patientsRepository;
        this.attributesRepository = attributesRepository;
    }
    async execute(request, ...requestAttributes) {
        const { userId, name, cpf, caregiver, email, phone, phone2, sex, civilStatus, birthDate, schooling, addressCep, address, number, complement, district, city, state, country, comments } = request;
        const patient = await this.patientsRepository.findByEmail(email);
        if (patient) {
            throw new Error("Email already registered");
        }
        for (const element of Object.entries(requestAttributes[0])) {
            if (element[1] !== true && element[1] !== false) {
                throw new Error(`Attribute '${element[0]}' must be a boolean`);
            }
        }
        for (const element of Object.entries(requestAttributes[0])) {
            const attribute = await this.attributesRepository.findByName(element[0]);
            if (!attribute) {
                throw new Error(`Attribute '${element[0]}' not found`);
            }
        }
        const attributes = Object.entries(requestAttributes[0]).reduce((a, v) => ([...a, { name: v[0], value: v[1] ? true : false }]), []);
        const newPatient = new patient_1.Patient({
            userId,
            name: name.toUpperCase(),
            cpf,
            caregiver,
            email,
            phone,
            phone2,
            sex,
            civilStatus,
            birthDate,
            schooling,
            address,
            addressCep,
            number,
            complement,
            district,
            city,
            state,
            country,
            comments,
            attributes
        });
        this.patientsRepository.create(newPatient);
    }
};
CreatePatientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patients_repository_1.PatientsRepository,
        attributes_repository_1.AttributesRepository])
], CreatePatientUseCase);
exports.CreatePatientUseCase = CreatePatientUseCase;
