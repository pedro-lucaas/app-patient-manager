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
exports.RefreshTokenController = void 0;
const refresh_token_1 = require("../../../../application/use-cases/users/refresh-token");
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const refresh_token_body_1 = require("../dtos/refresh-token-body");
const swagger_1 = require("@nestjs/swagger");
let RefreshTokenController = class RefreshTokenController {
    constructor(refreshToken) {
        this.refreshToken = refreshToken;
    }
    async handle(body) {
        const { refreshToken } = body;
        try {
            const result = await this.refreshToken.execute({ refreshToken });
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Token invalid", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
__decorate([
    (0, decorators_1.Post)(),
    __param(0, (0, decorators_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_body_1.RefreshTokenBody]),
    __metadata("design:returntype", Promise)
], RefreshTokenController.prototype, "handle", null);
RefreshTokenController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, decorators_1.Controller)('refresh-token'),
    __metadata("design:paramtypes", [refresh_token_1.RefreshToken])
], RefreshTokenController);
exports.RefreshTokenController = RefreshTokenController;
