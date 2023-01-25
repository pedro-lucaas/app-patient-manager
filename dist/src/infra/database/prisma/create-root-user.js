"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootUser = void 0;
const config_1 = require("../../../config/config");
class RootUser {
    static async create(registerUser) {
        try {
            await registerUser.execute({
                name: config_1.USER_ROOT.name,
                email: config_1.USER_ROOT.email,
                phone: config_1.USER_ROOT.phone,
                password: config_1.USER_ROOT.password,
                roles: config_1.USER_ROOT.roles,
            });
            console.log(`Root user created: ${config_1.USER_ROOT.email}`);
        }
        catch (error) { }
    }
}
exports.RootUser = RootUser;
