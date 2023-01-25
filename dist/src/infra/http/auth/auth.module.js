"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const login_1 = require("../../../application/use-cases/users/login");
const login_controller_1 = require("./controllers/login.controller");
const refresh_token_1 = require("../../../application/use-cases/users/refresh-token");
const refresh_token_controller_1 = require("./controllers/refresh-token.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../../config/config");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register(config_1.jwtOptions),
        ],
        controllers: [
            login_controller_1.LoginController,
            refresh_token_controller_1.RefreshTokenController
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            login_1.Login,
            refresh_token_1.RefreshToken,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
