import { Req, Controller, Get, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { FindUserProfile } from "@application/use-cases/users/find-user-profile";
import { UserViewModel } from "../view-models/user-view-model";
import { Roles, Role, RolesGuard, JwtAuthGuard } from "@infra/http/auth";

@Roles(Role.User)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class FindUserProfileController {
  constructor(
    private findUserProfile: FindUserProfile,
  ) { }

  @Get()
  async handle(@Req() req: any) {
    const { sub: userId } = req.user;
    try {
      const { user } = await this.findUserProfile.execute({
        userId,
      });

      return UserViewModel.toHTTP(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}