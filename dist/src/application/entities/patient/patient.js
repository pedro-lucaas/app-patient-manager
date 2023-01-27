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
    get cpf() {
        return this.props.cpf;
    }
    get caregiver() {
        return this.props.caregiver;
    }
    get email() {
        return this.props.email;
    }
    get phone() {
        return this.props.phone;
    }
    get phone2() {
        return this.props.phone2;
    }
    get sex() {
        return this.props.sex;
    }
    get civilStatus() {
        return this.props.civilStatus;
    }
    get birthDate() {
        return this.props.birthDate;
    }
    get schooling() {
        return this.props.schooling;
    }
    get addressCep() {
        return this.props.addressCep;
    }
    get address() {
        return this.props.address;
    }
    get number() {
        return this.props.number;
    }
    get complement() {
        return this.props.complement;
    }
    get district() {
        return this.props.district;
    }
    get city() {
        return this.props.city;
    }
    get state() {
        return this.props.state;
    }
    get country() {
        return this.props.country;
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
    set cpf(cpf) {
        this.set({ cpf });
    }
    set caregiver(caregiver) {
        this.set({ caregiver });
    }
    set email(email) {
        this.set({ email });
    }
    set phone(phone) {
        this.set({ phone });
    }
    set phone2(phone2) {
        this.set({ phone2 });
    }
    set sex(sex) {
        this.set({ sex });
    }
    set civilStatus(civilStatus) {
        this.set({ civilStatus });
    }
    set birthDate(birthDate) {
        this.set({ birthDate });
    }
    set schooling(schooling) {
        this.set({ schooling });
    }
    set addressCep(addressCep) {
        this.set({ addressCep });
    }
    set address(address) {
        this.set({ address });
    }
    set number(number) {
        this.set({ number });
    }
    set complement(complement) {
        this.set({ complement });
    }
    set district(district) {
        this.set({ district });
    }
    set city(city) {
        this.set({ city });
    }
    set state(state) {
        this.set({ state });
    }
    set country(country) {
        this.set({ country });
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
