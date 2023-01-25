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
exports.ListAttributesUseCase = exports.ListAttributesResponse = void 0;
const attributes_repository_1 = require("../../repositories/attributes-repository");
const common_1 = require("@nestjs/common");
class ListAttributesResponse {
}
exports.ListAttributesResponse = ListAttributesResponse;
let ListAttributesUseCase = class ListAttributesUseCase {
    constructor(attributesRepository) {
        this.attributesRepository = attributesRepository;
    }
    async execute() {
        const attributes = await this.attributesRepository.findAll();
        return { attributes };
    }
};
ListAttributesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attributes_repository_1.AttributesRepository])
], ListAttributesUseCase);
exports.ListAttributesUseCase = ListAttributesUseCase;
