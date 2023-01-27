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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
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
        newPatient.name = (_a = props.name.toUpperCase()) !== null && _a !== void 0 ? _a : newPatient.name;
        newPatient.cpf = (_b = props.cpf) !== null && _b !== void 0 ? _b : newPatient.cpf;
        newPatient.caregiver = (_c = props.caregiver) !== null && _c !== void 0 ? _c : newPatient.caregiver;
        newPatient.email = email !== null && email !== void 0 ? email : newPatient.email;
        newPatient.phone = (_d = props.phone) !== null && _d !== void 0 ? _d : newPatient.phone;
        newPatient.phone2 = (_e = props.phone2) !== null && _e !== void 0 ? _e : newPatient.phone2;
        newPatient.sex = (_f = props.sex) !== null && _f !== void 0 ? _f : newPatient.sex;
        newPatient.civilStatus = (_g = props.civilStatus) !== null && _g !== void 0 ? _g : newPatient.civilStatus;
        newPatient.birthDate = props.birthDate.getTime() ? props.birthDate : newPatient.birthDate;
        newPatient.schooling = (_h = props.schooling) !== null && _h !== void 0 ? _h : newPatient.schooling;
        newPatient.addressCep = (_j = props.addressCep) !== null && _j !== void 0 ? _j : newPatient.addressCep;
        newPatient.address = (_k = props.address) !== null && _k !== void 0 ? _k : newPatient.address;
        newPatient.number = (_l = props.number) !== null && _l !== void 0 ? _l : newPatient.number;
        newPatient.complement = (_m = props.complement) !== null && _m !== void 0 ? _m : newPatient.complement;
        newPatient.district = (_o = props.district) !== null && _o !== void 0 ? _o : newPatient.district;
        newPatient.city = (_p = props.city) !== null && _p !== void 0 ? _p : newPatient.city;
        newPatient.state = (_q = props.state) !== null && _q !== void 0 ? _q : newPatient.state;
        newPatient.country = (_r = props.country) !== null && _r !== void 0 ? _r : newPatient.country;
        newPatient.comments = (_s = props.comments) !== null && _s !== void 0 ? _s : newPatient.comments;
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
