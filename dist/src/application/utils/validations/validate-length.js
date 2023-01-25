"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLength = void 0;
function validateLength(value, field, min, max) {
    const isValid = value.length >= min && value.length <= max;
    field = field[0].toUpperCase() + field.slice(1);
    if (!isValid) {
        throw new Error(`${field} must be between ${min} and ${max} characters`);
    }
    return isValid;
}
exports.validateLength = validateLength;
