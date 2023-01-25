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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfile = exports.UpdateUserProfileRequest = void 0;
const users_repository_1 = require("../../repositories/users-repository");
const common_1 = require("@nestjs/common");
class UpdateUserProfileRequest {
}
exports.UpdateUserProfileRequest = UpdateUserProfileRequest;
let UpdateUserProfile = class UpdateUserProfile {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(request) {
        var _a, _b;
        const { userId } = request, props = __rest(request, ["userId"]);
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        user.name = (_a = props.name) !== null && _a !== void 0 ? _a : user.name;
        user.phone = (_b = props.phone) !== null && _b !== void 0 ? _b : user.phone;
        await this.usersRepository.save(user);
    }
};
UpdateUserProfile = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UpdateUserProfile);
exports.UpdateUserProfile = UpdateUserProfile;
