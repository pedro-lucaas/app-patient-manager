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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = exports.ResetPasswordRequest = void 0;
const users_repository_1 = require("../../repositories/users-repository");
const hasher_1 = require("../../utils/auth/hasher");
const common_1 = require("@nestjs/common");
class ResetPasswordRequest {
}
exports.ResetPasswordRequest = ResetPasswordRequest;
let ResetPassword = class ResetPassword {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(request) {
        const { userId, password, newPassword } = request;
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = hasher_1.Hasher.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Password is incorrect');
        }
        user.password = hasher_1.Hasher.hash(newPassword);
        await this.usersRepository.save(user);
    }
};
ResetPassword = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], ResetPassword);
exports.ResetPassword = ResetPassword;