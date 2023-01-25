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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientUseCase = exports.UpdatePatientRequest = void 0;
const attributes_repository_1 = require("../../repositories/attributes-repository");
const patients_repository_1 = require("../../repositories/patients-repository");
const common_1 = require("@nestjs/common");
class UpdatePatientRequest {
}
exports.UpdatePatientRequest = UpdatePatientRequest;
let UpdatePatientUseCase = class UpdatePatientUseCase {
    constructor(patientsRepository, attributesRepository) {
        this.patientsRepository = patientsRepository;
        this.attributesRepository = attributesRepository;
    }
    async execute(request, ...requestAttributes) {
        var _a, _b, _c, _d;
        const { patientId, email } = request, props = __rest(request, ["patientId", "email"]);
        const newPatient = await this.patientsRepository.findById(patientId);
        if (!newPatient) {
            throw new Error("Patient not found");
        }
        if (email) {
            const patient = await this.patientsRepository.findByEmail(email);
            if (patient && patient.patientId !== patientId) {
                throw new Error("Email already registered");
            }
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
        newPatient.name = (_a = props.name) !== null && _a !== void 0 ? _a : newPatient.name;
        newPatient.email = email !== null && email !== void 0 ? email : newPatient.email;
        newPatient.phone = (_b = props.phone) !== null && _b !== void 0 ? _b : newPatient.phone;
        newPatient.sex = (_c = props.sex) !== null && _c !== void 0 ? _c : newPatient.sex;
        newPatient.birthDate = props.birthDate.getTime() ? props.birthDate : newPatient.birthDate;
        newPatient.comments = (_d = props.comments) !== null && _d !== void 0 ? _d : newPatient.comments;
        newPatient.attributes = attributes;
        this.patientsRepository.save(newPatient);
    }
};
UpdatePatientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patients_repository_1.PatientsRepository,
        attributes_repository_1.AttributesRepository])
], UpdatePatientUseCase);
exports.UpdatePatientUseCase = UpdatePatientUseCase;
