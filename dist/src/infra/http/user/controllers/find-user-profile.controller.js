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
exports.FindUserProfileController = void 0;
const common_1 = require("@nestjs/common");
const find_user_profile_1 = require("../../../../application/use-cases/users/find-user-profile");
const user_view_model_1 = require("../view-models/user-view-model");
const auth_1 = require("../../auth");
let FindUserProfileController = class FindUserProfileController {
    constructor(findUserProfile) {
        this.findUserProfile = findUserProfile;
    }
    async handle(req) {
        const { sub: userId } = req.user;
        try {
            const { user } = await this.findUserProfile.execute({
                userId,
            });
            return user_view_model_1.UserViewModel.toHTTP(user);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FindUserProfileController.prototype, "handle", null);
FindUserProfileController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [find_user_profile_1.FindUserProfile])
], FindUserProfileController);
exports.FindUserProfileController = FindUserProfileController;
