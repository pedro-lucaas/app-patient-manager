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
exports.DeleteAttributeUseCase = exports.DeleteAttributeRequest = void 0;
const attributes_repository_1 = require("../../repositories/attributes-repository");
const common_1 = require("@nestjs/common");
class DeleteAttributeRequest {
}
exports.DeleteAttributeRequest = DeleteAttributeRequest;
let DeleteAttributeUseCase = class DeleteAttributeUseCase {
    constructor(attributesRepository) {
        this.attributesRepository = attributesRepository;
    }
    async execute(request) {
        const { name } = request;
        const attribute = await this.attributesRepository.findByName(name);
        if (!attribute) {
            throw new Error("Attribute not found");
        }
        if (attribute.patients.length !== 0) {
            throw new Error("Attribute has patients");
        }
        this.attributesRepository.delete(name);
    }
};
DeleteAttributeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attributes_repository_1.AttributesRepository])
], DeleteAttributeUseCase);
exports.DeleteAttributeUseCase = DeleteAttributeUseCase;
