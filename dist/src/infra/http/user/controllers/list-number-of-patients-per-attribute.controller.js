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
exports.ListNumberOfPatientsPerAttributeController = void 0;
const list_number_of_patients_per_attributes_1 = require("../../../../application/use-cases/users/list-number-of-patients-per-attributes");
const common_1 = require("@nestjs/common");
const auth_1 = require("../../auth");
let ListNumberOfPatientsPerAttributeController = class ListNumberOfPatientsPerAttributeController {
    constructor(listNumberOfPatientsPerAttribute) {
        this.listNumberOfPatientsPerAttribute = listNumberOfPatientsPerAttribute;
    }
    async handle() {
        try {
            const { result } = await this.listNumberOfPatientsPerAttribute.execute();
            return result;
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListNumberOfPatientsPerAttributeController.prototype, "handle", null);
ListNumberOfPatientsPerAttributeController = __decorate([
    (0, auth_1.Roles)(auth_1.Role.User),
    (0, common_1.UseGuards)(auth_1.JwtAuthGuard, auth_1.RolesGuard),
    (0, common_1.Controller)('pie-chart'),
    __metadata("design:paramtypes", [list_number_of_patients_per_attributes_1.ListNumberOfPatientsPerAttributeUseCase])
], ListNumberOfPatientsPerAttributeController);
exports.ListNumberOfPatientsPerAttributeController = ListNumberOfPatientsPerAttributeController;
