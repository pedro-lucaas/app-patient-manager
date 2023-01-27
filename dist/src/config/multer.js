"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageTypes = void 0;
const multer_1 = require("multer");
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
exports.storageTypes = {
    local: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, cb) => {
            const filename = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            file.key = `${filename}-${Date.now()}.${fileExtension}`;
            file.location = `http://localhost:3000/files/${file.key}`;
            cb(null, file.key);
        },
    }),
    s3: (0, multer_s3_1.default)({
        s3: new client_s3_1.S3({}),
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const filename = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            cb(null, `${filename}-${Date.now()}.${fileExtension}`);
        }
    }),
};
