import { FileValidator } from "@nestjs/common";
export declare type MaxFileSizeValidatorOptions = {
  maxSize: number;
  body: any;
};
export class MaxFileSizeValidatorMe extends FileValidator<MaxFileSizeValidatorOptions> {
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

