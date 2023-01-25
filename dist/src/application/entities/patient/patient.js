"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const node_crypto_1 = require("node:crypto");
class Patient {
    set(props) {
        this.props = Object.assign(Object.assign(Object.assign({}, this.props), props), { updatedAt: new Date() });
    }
    constructor(props, patientId) {
        var _a, _b;
        this._patientId = patientId !== null && patientId !== void 0 ? patientId : (0, node_crypto_1.randomUUID)();
        this.props = Object.assign(Object.assign({}, props), { createdAt: (_a = props.createdAt) !== null && _a !== void 0 ? _a : new Date(), updatedAt: (_b = props.updatedAt) !== null && _b !== void 0 ? _b : new Date() });
    }
    get patientId() {
        return this._patientId;
    }
    get userId() {
        return this.props.userId;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get phone() {
        return this.props.phone;
    }
    get sex() {
        return this.props.sex;
    }
    get birthDate() {
        return this.props.birthDate;
    }
    get comments() {
        return this.props.comments;
    }
    get attributes() {
        return this.props.attributes;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get canceledAt() {
        return this.props.canceledAt;
    }
    set name(name) {
        this.set({ name });
    }
    set email(email) {
        this.set({ email });
    }
    set phone(phone) {
        this.set({ phone });
    }
    set sex(sex) {
        this.set({ sex });
    }
    set birthDate(birthDate) {
        this.set({ birthDate });
    }
    set comments(comments) {
        this.set({ comments });
    }
    set attributes(attributes) {
        this.set({ attributes });
    }
    cancel() {
        var _a;
        this.set({ canceledAt: (_a = this.props.canceledAt) !== null && _a !== void 0 ? _a : new Date() });
    }
}
exports.Patient = Patient;
