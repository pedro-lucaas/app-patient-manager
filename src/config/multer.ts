import { diskStorage, Multer } from "multer";
import * as multerS3 from "multer-s3";
import { S3 } from '@aws-sdk/client-s3';

export const storageTypes = {
  local: diskStorage({
    destination: './uploads',
    filename: (req, file: any, cb) => {
      const filename: string = file.originalname.split('.')[0];
      const fileExtension: string = file.originalname.split('.')[1];
      file.key = `${filename}-${Date.now()}.${fileExtension}`;
      file.location = `http://localhost:3000/files/${file.key}`;
      cb(null, file.key);
    },

  }),
  s3: multerS3({
    s3: new S3({}),
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const filename: string = file.originalname.split('.')[0];
      const fileExtension: string = file.originalname.split('.')[1];
      cb(null, `${filename}-${Date.now()}.${fileExtension}`);
    }
  }),
};