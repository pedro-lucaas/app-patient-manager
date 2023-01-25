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
exports.Login = exports.LoginResponse = exports.LoginRequest = void 0;
const users_repository_1 = require("../../repositories/users-repository");
const config_1 = require("../../../config/config");
const hasher_1 = require("../../utils/auth/hasher");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
class LoginRequest {
}
exports.LoginRequest = LoginRequest;
class LoginResponse {
}
exports.LoginResponse = LoginResponse;
let Login = class Login {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async execute(request) {
        const { email, password } = request;
        let user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new Error('Email not registered');
        }
        const isPasswordValid = hasher_1.Hasher.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Password is incorrect');
        }
        const payload = {
            email: user.email,
            sub: user.userId,
            roles: user.roles,
        };
        const access_token = this.jwtService.sign(payload);
        const refresh_token_payload = {
            id: (0, crypto_1.randomUUID)(),
            sub: user.userId
        };
        const refresh_token = this.jwtService.sign(refresh_token_payload, { expiresIn: config_1.REFRESH_TOKEN_EXPIRES_IN });
        user.refreshToken = refresh_token;
        await this.usersRepository.save(user);
        return { access_token, refresh_token };
    }
};
Login = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService])
], Login);
exports.Login = Login;
