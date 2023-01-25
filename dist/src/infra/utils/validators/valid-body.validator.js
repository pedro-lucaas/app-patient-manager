"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxFileSizeValidatorMe = void 0;
const common_1 = require("@nestjs/common");
class MaxFileSizeValidatorMe extends common_1.FileValidator {
    buildErrorMessage() {
        return `Validation failed (expected size is less than ${this.validationOptions.maxSize})`;
    }
    isValid(file) {
        console.log(this.validationOptions);
        if (!this.validationOptions) {
            return true;
        }
        return file.size < this.validationOptions.maxSize;
    }
}
exports.MaxFileSizeValidatorMe = MaxFileSizeValidatorMe;
