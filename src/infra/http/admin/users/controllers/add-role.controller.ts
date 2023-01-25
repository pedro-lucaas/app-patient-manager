import { AddRoleToUser } from "@application/use-cases/admin/add-role-to-user";
import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AddRoleToUserBody } from "../dtos/add-role-to-user-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/user/add-role')
export class AddRoleToUserController {
  constructor(
    private addRoleToUser: AddRoleToUser,
  ) { }

  @Post()
  async handle(@Body() body: AddRoleToUserBody) {
    const { role, userId } = body;
    try {
      await this.addRoleToUser.execute({ roleName: role, userId });

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}