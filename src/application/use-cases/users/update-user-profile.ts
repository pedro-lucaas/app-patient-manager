import { UsersRepository } from "@application/repositories/users-repository";
import { Injectable } from "@nestjs/common";

export class UpdateUserProfileRequest {
  userId: string;
  name?: string;
  phone?: string;
  inactiveDays?: string;
  lunchTime?: string;
  workTime?: string;
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
    user.inactiveDays = props.inactiveDays ?? user.inactiveDays;
    user.lunchTime = props.lunchTime ?? user.lunchTime;
    user.workTime = props.workTime ?? user.workTime;

    await this.usersRepository.save(user);
  }
}



