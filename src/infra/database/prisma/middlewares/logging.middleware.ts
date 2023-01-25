import { S3Service } from '@application/services/s3-service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3: S3Service
  ) { }
  use(req: Request, res: Response, next: NextFunction) {
    this.prisma.$use(async (params, next) => {
      // Check incoming query type
      if (params.model && params.model == 'AppointmentsFiles') {
        if (params.action == 'delete') {
          // Delete file from S3
          const file = await this.prisma.appointmentsFiles.findUnique({
            where: params.args.where
          })
          if (file) {
            await this.s3.deleteFile(file.fileName)
          }
        }
        if (params.action == 'deleteMany') {
          // Delete files from S3
          const files = await this.prisma.appointmentsFiles.findMany({
            where: params.args.where
          })
          for (const file of files) {
            await this.s3.deleteFile(file.fileName)
          }
        }
      }
      return next(params)
    })
    next();
  }
}
