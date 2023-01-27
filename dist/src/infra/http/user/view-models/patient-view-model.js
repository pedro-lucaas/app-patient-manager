"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientViewModel = void 0;
class PatientViewModel {
    static toHTTP(patient) {
        return Object.assign(Object.assign({ id: patient.patientId, userId: patient.userId, name: patient.name, cpf: patient.cpf, caregiver: patient.caregiver, email: patient.email, phone: patient.phone, phone2: patient.phone2, sex: patient.sex, civilStatus: patient.civilStatus, birthDate: patient.birthDate, schooling: patient.schooling, addressCep: patient.addressCep, address: patient.address, number: patient.number, complement: patient.complement, district: patient.district, city: patient.city, state: patient.state, country: patient.country, comments: patient.comments }, Object.entries(patient.attributes).reduce((a, v) => (Object.assign(Object.assign({}, a), { [v[1].name]: v[1].value })), {})), { createdAt: patient.createdAt, updatedAt: patient.updatedAt });
    }
}
exports.PatientViewModel = PatientViewModel;
