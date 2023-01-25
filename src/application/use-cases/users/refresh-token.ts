import { UsersRepository } from "@application/repositories/users-repository";
import { REFRESH_TOKEN_EXPIRES_IN } from "@config/config";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

export class RefreshTokenRequest {
  refreshToken: string;
}

export class RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class RefreshToken {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) { }

  async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const { refreshToken } = request;
    const refresh_token = this.jwtService.verify(refreshToken);
    const user = await this.usersRepository.findById(refresh_token.sub);
    if (!user) {
      throw new Error('User not found');
    }
    if (refreshToken !== user.refreshToken) {
      throw new Error('Token is invalid');
    }

    const payload = {
      email: user.email,
      sub: user.userId,
      roles: user.roles,
    };
    const access_token = this.jwtService.sign(payload);

    const new_refresh_token_payload = {
      id: randomUUID(),
      sub: user.userId
    };
    const new_refresh_token = this.jwtService.sign(new_refresh_token_payload, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    user.refreshToken = new_refresh_token;
    await this.usersRepository.save(user);

    return { access_token, refresh_token: new_refresh_token };
  }
}