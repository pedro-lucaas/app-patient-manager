"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAlphabetCharacters = void 0;
function validateAlphabetCharacters(value) {
    const isValid = /^[a-zA-Z]+$/.test(value);
    if (!isValid) {
        throw new Error('The field must contain only alphabet characters');
    }
    return isValid;
}
exports.validateAlphabetCharacters = validateAlphabetCharacters;
