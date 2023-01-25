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
exports.ListAttributesController = void 0;
const common_1 = require("@nestjs/common");
const list_attributes_1 = require("../../../../application/use-cases/users/list-attributes");
const auth_1 = require("../../auth");
const attributes_view_model_1 = require("../view-models/attributes-view-model");
let ListAttributesController = class ListAttributesController {
    constructor(listAttributes) {
        this.listAttributes = listAttributes;
    }
    async handle() {
        const { attributes } = await this.listAttributes.execute();
        return {
            items: attributes.map(attributes_view_model_1.AttributeViewModel.toHTTP),
        };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListAttributesController.prototype, "handle", null);
ListAttributesController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('attributes'),
    __metadata("design:paramtypes", [list_attributes_1.ListAttributesUseCase])
], ListAttributesController);
exports.ListAttributesController = ListAttributesController;
