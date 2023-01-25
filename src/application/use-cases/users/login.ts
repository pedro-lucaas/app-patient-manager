import { UsersRepository } from "@application/repositories/users-repository";
import { REFRESH_TOKEN_EXPIRES_IN } from "@config/config";
import { Hasher } from "@application/utils/auth/hasher";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

export class LoginRequest {
  email: string;
  password: string;
}

export class LoginResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class Login {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) { }

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const { email, password } = request;
    let user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new Error('Email not registered');
    }

    const isPasswordValid = Hasher.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Password is incorrect');
    }

    const payload = {
      email: user.email,
      sub: user.userId,
      roles: user.roles,
    };
    const access_token = this.jwtService.sign(payload);

    const refresh_token_payload = {
      id: randomUUID(),
      sub: user.userId
    };
    const refresh_token = this.jwtService.sign(refresh_token_payload, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    user.refreshToken = refresh_token;
    await this.usersRepository.save(user);

    return { access_token, refresh_token };
  }
}