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
exports.ListUsersController = void 0;
const list_users_1 = require("../../../../../application/use-cases/admin/list-users");
const common_1 = require("@nestjs/common");
const user_view_model_1 = require("../view-models/user-view-model");
const parse_int_pipe_1 = require("../../../../utils/pipes/parse-int.pipe");
const auth_1 = require("../../../auth");
let ListUsersController = class ListUsersController {
    constructor(listUsers) {
        this.listUsers = listUsers;
    }
    async handle(page) {
        const { users } = await this.listUsers.execute(page);
        return Object.assign(Object.assign({}, users), { items: users.items.map(user_view_model_1.UserViewModel.toHTTP) });
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', parse_int_pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ListUsersController.prototype, "handle", null);
ListUsersController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.Admin),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('admin/users'),
    __metadata("design:paramtypes", [list_users_1.ListUsers])
], ListUsersController);
exports.ListUsersController = ListUsersController;
