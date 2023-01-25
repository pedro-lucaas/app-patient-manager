import { MiddlewareConsumer, NestModule } from "@nestjs/common";
export declare class DatabaseModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
