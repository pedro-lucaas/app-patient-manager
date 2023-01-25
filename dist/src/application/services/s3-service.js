"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let S3Service = class S3Service {
    constructor() {
        this.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
            region: process.env.AWS_S3_REGION
        });
    }
    async uploadFile(file, uniqueString) {
        const { originalname, mimetype, buffer } = file;
        const name = originalname.split('.')[0];
        const extension = originalname.split('.')[1];
        const newFileName = `${name}-${uniqueString}.${extension}`;
        try {
            let s3Response = await this.s3.upload({
                Bucket: 'patient-manager-files',
                Key: newFileName,
                Body: buffer,
                ACL: "public-read",
                ContentType: mimetype,
                ContentDisposition: "inline",
            }).promise();
            return s3Response;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async uploadFiles(files, uniqueString) {
        let s3Responses = [];
        for (const file of files) {
            const s3Response = await this.uploadFile(file, uniqueString);
            s3Responses.push(s3Response);
        }
        return s3Responses;
    }
    async deleteFile(key) {
        try {
            let s3Response = await this.s3.deleteObject({
                Bucket: 'patient-manager-files',
                Key: key,
            }).promise();
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
exports.S3Service = S3Service;
