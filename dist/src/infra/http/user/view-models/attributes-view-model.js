"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeViewModel = void 0;
class AttributeViewModel {
    static toHTTP(attribute) {
        return {
            name: attribute.name,
        };
    }
}
exports.AttributeViewModel = AttributeViewModel;
