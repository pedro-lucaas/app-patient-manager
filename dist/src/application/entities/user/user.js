"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_crypto_1 = require("node:crypto");
class User {
    set(props) {
        this.props = Object.assign(Object.assign(Object.assign({}, this.props), props), { updatedAt: new Date() });
    }
    constructor(props, userId) {
        var _a, _b;
        this._userId = userId !== null && userId !== void 0 ? userId : (0, node_crypto_1.randomUUID)();
        this.props = Object.assign(Object.assign({}, props), { createdAt: (_a = props.createdAt) !== null && _a !== void 0 ? _a : new Date(), updatedAt: (_b = props.updatedAt) !== null && _b !== void 0 ? _b : new Date() });
    }
    get userId() {
        return this._userId;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get password() {
        return this.props.password;
    }
    get phone() {
        return this.props.phone;
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
    get refreshToken() {
        return this.props.refreshToken;
    }
    get roles() {
        return this.props.roles;
    }
    set name(name) {
        this.set({ name });
    }
    set email(email) {
        this.set({ email });
    }
    set password(password) {
        this.set({ password });
    }
    set phone(phone) {
        this.set({ phone });
    }
    set refreshToken(refreshToken) {
        this.props.refreshToken = refreshToken;
    }
    set roles(roles) {
        this.props.roles = roles;
    }
    cancel() {
        this.set({ canceledAt: new Date() });
    }
}
exports.User = User;
