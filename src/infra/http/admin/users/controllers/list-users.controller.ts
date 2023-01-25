import { ListUsers } from "@application/use-cases/admin/list-users";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { UserViewModel } from "../view-models/user-view-model";
import { ParseIntPipe } from "@infra/utils/pipes/parse-int.pipe";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/users')
export class ListUsersController {
  constructor(
    private listUsers: ListUsers,
  ) { }

  @Get()
  async handle(@Query('page', ParseIntPipe) page: number) {
    const { users } = await this.listUsers.execute(page);

    return {
      ...users,
      items: users.items.map(UserViewModel.toHTTP)
    };
  }
}