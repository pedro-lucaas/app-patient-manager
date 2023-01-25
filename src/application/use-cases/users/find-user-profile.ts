import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { Injectable } from "@nestjs/common";

export class FindUserProfileRequest {
  userId: string;
}

export class FindUserProfileResponse {
  user: User;
}

@Injectable()
export class FindUserProfile {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: FindUserProfileRequest): Promise<FindUserProfileResponse> {
    const { userId } = request;
    const user = await this.usersRepository.findById(userId);
    return { user }
  }
}