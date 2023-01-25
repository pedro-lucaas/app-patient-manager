import { RemoveRoleFromUser } from "@application/use-cases/admin/remove-role-from-user";
import { Body, Controller, HttpException, HttpStatus, UseGuards, Post } from "@nestjs/common";
import { RemoveRoleFromUserBody } from "../dtos/remove-role-from-user-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/user/remove-role')
export class RemoveRoleFromUserController {
  constructor(
    private removeRoleFromUser: RemoveRoleFromUser,
  ) { }

  @Post()
  async handle(@Body() body: RemoveRoleFromUserBody) {
    const { role, userId } = body;
    try {
      await this.removeRoleFromUser.execute({ roleName: role, userId });

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}