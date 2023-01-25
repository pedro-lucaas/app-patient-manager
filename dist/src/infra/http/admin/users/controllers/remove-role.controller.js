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
exports.RemoveRoleFromUserController = void 0;
const remove_role_from_user_1 = require("../../../../../application/use-cases/admin/remove-role-from-user");
const common_1 = require("@nestjs/common");
const remove_role_from_user_body_1 = require("../dtos/remove-role-from-user-body");
const auth_1 = require("../../../auth");
let RemoveRoleFromUserController = class RemoveRoleFromUserController {
    constructor(removeRoleFromUser) {
        this.removeRoleFromUser = removeRoleFromUser;
    }
    async handle(body) {
        const { role, userId } = body;
        try {
            await this.removeRoleFromUser.execute({ roleName: role, userId });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_role_from_user_body_1.RemoveRoleFromUserBody]),
    __metadata("design:returntype", Promise)
], RemoveRoleFromUserController.prototype, "handle", null);
RemoveRoleFromUserController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.Admin),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('admin/user/remove-role'),
    __metadata("design:paramtypes", [remove_role_from_user_1.RemoveRoleFromUser])
], RemoveRoleFromUserController);
exports.RemoveRoleFromUserController = RemoveRoleFromUserController;
