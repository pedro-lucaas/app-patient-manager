import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { ResetPassword } from "./reset-password";
import { Hasher } from "@application/utils/auth/hasher";

describe('Reset Password', () => {
  it('should be able to reset a password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const resetPassword = new ResetPassword(usersRepository);
    const password = 'senha1';

    const user = makeUser({ password: Hasher.hash(password) });

    usersRepository.create(user);

    await resetPassword.execute({
      userId: user.userId,
      password: password,
      newPassword: 'newPassword',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(Hasher.compare('newPassword', usersRepository.users[0].password)).toBe(true);
  });
  it('should not be able to reset a password with a wrong old password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const resetPassword = new ResetPassword(usersRepository);

    const user = makeUser();

    usersRepository.users.push(user);

    expect(resetPassword.execute({
      userId: user.userId,
      password: 'wrongPassword',
      newPassword: 'newPassword',
    })).rejects.toThrowError('Password is incorrect');
  });
});


