import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { Hasher } from "@application/utils/auth/hasher";
import { Injectable } from "@nestjs/common";
import { Role } from "@infra/http/auth";

export class RegisterUserRequest {
  name: string;
  email: string;
  phone: string;
  password?: string;
  roles?: string[];
}

@Injectable()
export class RegisterUser {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: RegisterUserRequest): Promise<void> {
    const { name, email, phone, password } = request;
    let user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new Error('Email already registered');
    }

    user = new User({
      name,
      email,
      phone,
      password: Hasher.hash(password),
      roles: request.roles || [Role.User],
    })

    await this.usersRepository.create(user);

  }
}