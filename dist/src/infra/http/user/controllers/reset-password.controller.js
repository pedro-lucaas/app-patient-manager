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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const reset_password_1 = require("../../../../application/use-cases/users/reset-password");
const common_1 = require("@nestjs/common");
const reset_password_body_1 = require("../dtos/reset-password-body");
const auth_1 = require("../../auth");
let ResetPasswordController = class ResetPasswordController {
    constructor(resetPassword) {
        this.resetPassword = resetPassword;
    }
    async handle(req, body) {
        const { sub: userId } = req.user;
        const { password, newPassword } = body;
        try {
            await this.resetPassword.execute({
                userId,
                password,
                newPassword
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reset_password_body_1.RegisterUserBody]),
    __metadata("design:returntype", Promise)
], ResetPasswordController.prototype, "handle", null);
ResetPasswordController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('reset-password'),
    __metadata("design:paramtypes", [reset_password_1.ResetPassword])
], ResetPasswordController);
exports.ResetPasswordController = ResetPasswordController;
