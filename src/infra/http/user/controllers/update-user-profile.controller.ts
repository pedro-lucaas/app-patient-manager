import { UpdateUserProfile } from "@application/use-cases/users/update-user-profile";
import { Body, Controller, HttpException, HttpStatus, Put, Req, UseGuards } from "@nestjs/common";
import { UpdateUserProfileBody } from "../dtos/update-user-profile-body";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class UpdateUserProfileController {
  constructor(
    private updateUserProfile: UpdateUserProfile,
  ) { }

  @Put()
  async handle(
    @Req() req: any,
    @Body() body: UpdateUserProfileBody,
  ) {
    const { sub: userId } = req.user;
    const { name, phone } = body;
    try {
      await this.updateUserProfile.execute({
        userId,
        name,
        phone,
      })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}