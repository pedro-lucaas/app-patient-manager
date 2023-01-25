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
exports.LoginController = void 0;
const login_1 = require("../../../../application/use-cases/users/login");
const common_1 = require("@nestjs/common");
const login_body_1 = require("../dtos/login-body");
const swagger_1 = require("@nestjs/swagger");
let LoginController = class LoginController {
    constructor(login) {
        this.login = login;
    }
    async handle(body) {
        const { email, password } = body;
        try {
            const result = await this.login.execute({ email, password });
            return result;
        }
        catch (error) {
            throw new common_1.HttpException("Email or password invalid", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_body_1.LoginBody]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "handle", null);
LoginController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('login'),
    __metadata("design:paramtypes", [login_1.Login])
], LoginController);
exports.LoginController = LoginController;
