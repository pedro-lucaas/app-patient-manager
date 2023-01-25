import { S3Service } from '@application/services/s3-service';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../prisma.service';
export declare class LoggerMiddleware implements NestMiddleware {
    private readonly prisma;
    private readonly s3;
    constructor(prisma: PrismaService, s3: S3Service);
    use(req: Request, res: Response, next: NextFunction): void;
}
