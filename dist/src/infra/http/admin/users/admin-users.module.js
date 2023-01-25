"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersModule = void 0;
const common_1 = require("@nestjs/common");
const add_role_controller_1 = require("./controllers/add-role.controller");
const add_role_to_user_1 = require("../../../../application/use-cases/admin/add-role-to-user");
const list_users_controller_1 = require("./controllers/list-users.controller");
const list_users_1 = require("../../../../application/use-cases/admin/list-users");
const remove_role_controller_1 = require("./controllers/remove-role.controller");
const remove_role_from_user_1 = require("../../../../application/use-cases/admin/remove-role-from-user");
const database_module_1 = require("../../../database/database.module");
let AdminUsersModule = class AdminUsersModule {
};
AdminUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
        ],
        controllers: [
            add_role_controller_1.AddRoleToUserController,
            list_users_controller_1.ListUsersController,
            remove_role_controller_1.RemoveRoleFromUserController,
        ],
        providers: [
            add_role_to_user_1.AddRoleToUser,
            list_users_1.ListUsers,
            remove_role_from_user_1.RemoveRoleFromUser,
        ],
    })
], AdminUsersModule);
exports.AdminUsersModule = AdminUsersModule;
