import { UsersRepository } from "@application/repositories/users-repository";
import { Injectable } from "@nestjs/common";

export class RemoveRoleFromUserRequest {
  userId: string;
  roleName: string;
}

@Injectable()
export class RemoveRoleFromUser {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async execute(request: RemoveRoleFromUserRequest): Promise<void> {
    const { userId, roleName } = request;
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.roles = user.roles.filter(role => role !== roleName);

    await this.usersRepository.save(user);
  }
}