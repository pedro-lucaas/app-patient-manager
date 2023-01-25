import { Module } from "@nestjs/common";
import { AddRoleToUserController } from "./controllers/add-role.controller";
import { AddRoleToUser } from "@application/use-cases/admin/add-role-to-user";
import { ListUsersController } from "./controllers/list-users.controller";
import { ListUsers } from "@application/use-cases/admin/list-users";
import { RemoveRoleFromUserController } from "./controllers/remove-role.controller";
import { RemoveRoleFromUser } from "@application/use-cases/admin/remove-role-from-user";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    AddRoleToUserController,
    ListUsersController,
    RemoveRoleFromUserController,
  ],
  providers: [
    AddRoleToUser,
    ListUsers,
    RemoveRoleFromUser,
  ],
})

export class AdminUsersModule { }