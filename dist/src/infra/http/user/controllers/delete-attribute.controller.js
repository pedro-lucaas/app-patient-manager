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
exports.DeleteAttributeController = void 0;
const delete_attribute_1 = require("../../../../application/use-cases/users/delete-attribute");
const common_1 = require("@nestjs/common");
const auth_1 = require("../../auth");
let DeleteAttributeController = class DeleteAttributeController {
    constructor(deleteAttribute) {
        this.deleteAttribute = deleteAttribute;
    }
    async handle(name) {
        try {
            await this.deleteAttribute.execute({
                name,
            });
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeleteAttributeController.prototype, "handle", null);
DeleteAttributeController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('attribute/:name'),
    __metadata("design:paramtypes", [delete_attribute_1.DeleteAttributeUseCase])
], DeleteAttributeController);
exports.DeleteAttributeController = DeleteAttributeController;
