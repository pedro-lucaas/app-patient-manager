import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3
    ({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_KEY_SECRET,
      region: process.env.AWS_S3_REGION
    });

  async uploadFile(file: Express.Multer.File, uniqueString: string) {
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

  async uploadFiles(files: Express.Multer.File[], uniqueString: string) {
    let s3Responses: AWS.S3.ManagedUpload.SendData[] = [];
    for (const file of files) {
      const s3Response = await this.uploadFile(file, uniqueString);
      s3Responses.push(s3Response);
    }
    return s3Responses;
  }

  async deleteFile(key: string) {
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

}