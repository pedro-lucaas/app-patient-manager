"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAlphanumericCharacters = void 0;
function validateAlphanumericCharacters(value) {
    const isValid = /^[a-zA-Z0-9]+$/.test(value);
    if (!isValid) {
        throw new Error('The field must contain only alphanumeric characters');
    }
    return isValid;
}
exports.validateAlphanumericCharacters = validateAlphanumericCharacters;
