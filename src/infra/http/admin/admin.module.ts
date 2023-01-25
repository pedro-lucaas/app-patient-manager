import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { AdminUsersModule } from "./users/admin-users.module";

@Module({
  imports: [
    DatabaseModule,
    AdminUsersModule,
  ],
})

export class AdminModule { }