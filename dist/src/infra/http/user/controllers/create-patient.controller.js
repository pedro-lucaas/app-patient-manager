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
exports.CreatePatientController = void 0;
const create_patient_1 = require("../../../../application/use-cases/users/create-patient");
const common_1 = require("@nestjs/common");
const create_patient_body_1 = require("../dtos/create-patient-body");
const auth_1 = require("../../auth");
let CreatePatientController = class CreatePatientController {
    constructor(createPatient) {
        this.createPatient = createPatient;
    }
    async handle(body, req) {
        const { name, cpf, caregiver, email, phone, phone2, sex, civilStatus, birthDate, schooling, addressCep, address, number, complement, district, city, state, country, comments } = body, props = __rest(body, ["name", "cpf", "caregiver", "email", "phone", "phone2", "sex", "civilStatus", "birthDate", "schooling", "addressCep", "address", "number", "complement", "district", "city", "state", "country", "comments"]);
        const userId = req.user.sub;
        try {
            await this.createPatient.execute({
                userId,
                name,
                cpf,
                caregiver,
                email,
                phone,
                phone2,
                sex,
                civilStatus,
                birthDate: new Date(birthDate),
                schooling,
                addressCep,
                address,
                number,
                complement,
                district,
                city,
                state,
                country,
                comments,
            }, props);
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_body_1.CreatePatientBody, Object]),
    __metadata("design:returntype", Promise)
], CreatePatientController.prototype, "handle", null);
CreatePatientController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('patient'),
    __metadata("design:paramtypes", [create_patient_1.CreatePatientUseCase])
], CreatePatientController);
exports.CreatePatientController = CreatePatientController;
