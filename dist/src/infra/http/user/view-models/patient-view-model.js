"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientViewModel = void 0;
class PatientViewModel {
    static toHTTP(patient) {
        return Object.assign(Object.assign({ id: patient.patientId, userId: patient.userId, name: patient.name, email: patient.email, phone: patient.phone, sex: patient.sex, birthDate: patient.birthDate, comments: patient.comments }, Object.entries(patient.attributes).reduce((a, v) => (Object.assign(Object.assign({}, a), { [v[1].name]: v[1].value })), {})), { createdAt: patient.createdAt, updatedAt: patient.updatedAt });
    }
}
exports.PatientViewModel = PatientViewModel;
