import { UsersRepository } from "@application/repositories/users-repository";
import { Injectable } from "@nestjs/common";

export class UpdateUserProfileRequest {
  userId: string;
  name?: string;
  phone?: string;
}

@Injectable()
export class UpdateUserProfile {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: UpdateUserProfileRequest): Promise<void> {
    const { userId, ...props } = request;
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.name = props.name ?? user.name;
    user.phone = props.phone ?? user.phone;

    await this.usersRepository.save(user);
  }
}



