import { Hasher } from "@application/utils/auth/hasher";
import { JwtService } from "@nestjs/jwt";
import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { Login } from "./login";
import { RefreshToken } from "./refresh-token";

describe('Refresh Token', () => {
  it('should be able to refresh token', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const jwtService = new JwtService({
      secret: 'secret',
      signOptions: { expiresIn: '2s' },
    });
    const login = new Login(usersRepository, jwtService);
    const refreshToken = new RefreshToken(usersRepository, jwtService);

    const password = 'senha1';
    const passwordHash = Hasher.hash(password);
    const user = makeUser({ userId: 'user-id', password: passwordHash });
    usersRepository.users.push(user);

    const loginResponse = await login.execute({
      email: user.email,
      password: password,
    });

    await new Promise((r) => setTimeout(r, 2000));
    expect(() => jwtService.verify(loginResponse.access_token)).toThrowError();

    const refreshResponse = await refreshToken.execute({
      refreshToken: loginResponse.refresh_token,
    });
    expect(jwtService.verify(refreshResponse.access_token)).toBeTruthy();

    await new Promise((r) => setTimeout(r, 2000));
    expect(() => jwtService.verify(refreshResponse.access_token)).toThrowError();
  });
});