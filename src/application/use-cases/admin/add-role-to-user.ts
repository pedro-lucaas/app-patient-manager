import { UsersRepository } from "@application/repositories/users-repository";
import { Injectable } from "@nestjs/common";

export class AddRoleToUserRequest {
  userId: string;
  roleName: string;
}

@Injectable()
export class AddRoleToUser {
  constructor(
    private usersRepository: UsersRepository,
  ) { }

  async execute(request: AddRoleToUserRequest): Promise<void> {
    const { userId, roleName } = request;
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.roles.push(roleName);

    await this.usersRepository.save(user);
  }
}