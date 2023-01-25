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
exports.RegisterUser = exports.RegisterUserRequest = void 0;
const user_1 = require("../../entities/user/user");
const users_repository_1 = require("../../repositories/users-repository");
const hasher_1 = require("../../utils/auth/hasher");
const common_1 = require("@nestjs/common");
const auth_1 = require("../../../infra/http/auth");
class RegisterUserRequest {
}
exports.RegisterUserRequest = RegisterUserRequest;
let RegisterUser = class RegisterUser {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute(request) {
        const { name, email, phone, password } = request;
        let user = await this.usersRepository.findByEmail(email);
        if (user) {
            throw new Error('Email already registered');
        }
        user = new user_1.User({
            name,
            email,
            phone,
            password: hasher_1.Hasher.hash(password),
            roles: request.roles || [auth_1.Role.User],
        });
        await this.usersRepository.create(user);
    }
};
RegisterUser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], RegisterUser);
exports.RegisterUser = RegisterUser;
