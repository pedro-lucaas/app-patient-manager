"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROOT = exports.PAGE_SIZE = exports.REFRESH_TOKEN_EXPIRES_IN = exports.jwtOptions = void 0;
const role_enum_1 = require("../infra/http/auth/roles/role.enum");
exports.jwtOptions = {
    secret: 'secretKey',
    signOptions: { expiresIn: '1d' },
};
exports.REFRESH_TOKEN_EXPIRES_IN = "7d";
exports.PAGE_SIZE = 10;
exports.USER_ROOT = {
    name: "root",
    email: "admin@gmail.com",
    phone: "123456789",
    password: "123456",
    roles: [role_enum_1.Role.Admin, role_enum_1.Role.User]
};
