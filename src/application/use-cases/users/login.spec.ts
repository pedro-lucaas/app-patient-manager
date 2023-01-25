import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { Login } from "./login";
import { Hasher } from "@application/utils/auth/hasher";
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('Login User', () => {
  it('should be able to login a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const jwtService = new JwtService({
      secret: 'secret',
      signOptions: { expiresIn: '5s' },
    });
    const login = new Login(usersRepository, jwtService);
    const password = 'senha1';
    const user = makeUser({ password, roles: ['user'] });
    user.password = Hasher.hash(password);

    usersRepository.users.push(user);

    const response = await login.execute({
      email: user.email,
      password: password,
    });

    expect(response.access_token).toBeTruthy();
    expect(jwtService.verify(response.access_token)).toBeTruthy();
    expect(jwtService.verify(response.access_token).roles[0]).toBe('user');
    expect(response.refresh_token).toBeTruthy();
  });

  it('should not be able to login a user with a wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const jwtService = new JwtService({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    });
    const login = new Login(usersRepository, jwtService);

    const user = makeUser();

    usersRepository.users.push(user);

    expect(login.execute({
      email: 'wrongEmail',
      password: user.password,
    })).rejects.toThrowError('Email not registered');
  });

  it('should not be able to login a user with a wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const jwtService = new JwtService({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    });
    const login = new Login(usersRepository, jwtService);

    const user = makeUser();

    usersRepository.users.push(user);

    expect(login.execute({
      email: user.email,
      password: 'wrongPassword',
    })).rejects.toThrowError('Password is incorrect');
  });
});
