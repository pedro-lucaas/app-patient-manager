import { FileValidator } from "@nestjs/common";
export declare type MaxFileSizeValidatorOptions = {
    maxSize: number;
    body: any;
};
export declare class MaxFileSizeValidatorMe extends FileValidator<MaxFileSizeValidatorOptions> {
    buildErrorMessage(): string;
    isValid(file: any): boolean;
}
