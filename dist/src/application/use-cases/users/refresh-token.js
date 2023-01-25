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
exports.RefreshToken = exports.RefreshTokenResponse = exports.RefreshTokenRequest = void 0;
const users_repository_1 = require("../../repositories/users-repository");
const config_1 = require("../../../config/config");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
class RefreshTokenRequest {
}
exports.RefreshTokenRequest = RefreshTokenRequest;
class RefreshTokenResponse {
}
exports.RefreshTokenResponse = RefreshTokenResponse;
let RefreshToken = class RefreshToken {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async execute(request) {
        const { refreshToken } = request;
        const refresh_token = this.jwtService.verify(refreshToken);
        const user = await this.usersRepository.findById(refresh_token.sub);
        if (!user) {
            throw new Error('User not found');
        }
        if (refreshToken !== user.refreshToken) {
            throw new Error('Token is invalid');
        }
        const payload = {
            email: user.email,
            sub: user.userId,
            roles: user.roles,
        };
        const access_token = this.jwtService.sign(payload);
        const new_refresh_token_payload = {
            id: (0, crypto_1.randomUUID)(),
            sub: user.userId
        };
        const new_refresh_token = this.jwtService.sign(new_refresh_token_payload, { expiresIn: config_1.REFRESH_TOKEN_EXPIRES_IN });
        user.refreshToken = new_refresh_token;
        await this.usersRepository.save(user);
        return { access_token, refresh_token: new_refresh_token };
    }
};
RefreshToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        jwt_1.JwtService])
], RefreshToken);
exports.RefreshToken = RefreshToken;
