import { UsersRepository } from "@application/repositories/users-repository";
import { Hasher } from "@application/utils/auth/hasher";
import { Injectable } from "@nestjs/common";

export class ResetPasswordRequest {
  userId: string;
  password: string;
  newPassword: string;
}

@Injectable()
export class ResetPassword {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async execute(request: ResetPasswordRequest): Promise<void> {
    const { userId, password, newPassword } = request;

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = Hasher.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }

    user.password = Hasher.hash(newPassword);

    await this.usersRepository.save(user);
  }
}