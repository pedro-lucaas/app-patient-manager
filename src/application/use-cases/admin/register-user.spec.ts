import { Hasher } from "@application/utils/auth/hasher";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { RegisterUser } from "./register-user";

describe('Register User', () => {
  it('should be able to register a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUser = new RegisterUser(usersRepository);

    await registerUser.execute({
      name: 'User 1',
      email: 'user1@gmail.com',
      password: 'senha1',
      phone: '(99) 9 9999-9999',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toBeTruthy();
    expect(usersRepository.users[0].name).toBe('User 1');
    expect(usersRepository.users[0].email).toBe('user1@gmail.com');
    expect(usersRepository.users[0].phone).toBe('(99) 9 9999-9999');
    expect(Hasher.compare('senha1', usersRepository.users[0].password)).toBe(true);
  });

  it('should not be able to register a user with an existing email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUser = new RegisterUser(usersRepository);

    await registerUser.execute({
      name: 'User 1',
      email: 'user1@gmail.com',
      password: 'senha1',
      phone: '(99) 9 9999-9999',
    });

    await expect(registerUser.execute({
      name: 'User 1',
      email: 'user1@gmail.com',
      password: 'senha1',
      phone: '(99) 9 9999-9999',
    })).rejects.toThrowError('Email already registered');

    expect(usersRepository.users).toHaveLength(1);
  });
});