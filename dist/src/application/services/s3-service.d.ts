/// <reference types="multer" />
import * as AWS from "aws-sdk";
export declare class S3Service {
    AWS_S3_BUCKET: string;
    s3: AWS.S3;
    uploadFile(file: Express.Multer.File, uniqueString: string): Promise<AWS.S3.ManagedUpload.SendData>;
    uploadFiles(files: Express.Multer.File[], uniqueString: string): Promise<AWS.S3.ManagedUpload.SendData[]>;
    deleteFile(key: string): Promise<void>;
}
