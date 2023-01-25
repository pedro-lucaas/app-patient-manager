import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";

export class ListUsersResponse {
  users: Pagination<User>;
}

@Injectable()
export class ListUsers {
  constructor(
    private userRepository: UsersRepository,
  ) { }

  async execute(page?: number): Promise<ListUsersResponse> {
    const users = await this.userRepository.findAll(page);

    return { users };
  }
}
