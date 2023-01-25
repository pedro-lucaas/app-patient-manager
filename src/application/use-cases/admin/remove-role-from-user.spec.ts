import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { RemoveRoleFromUser } from "./remove-role-from-user";

describe('Remove Role from User', () => {
  it('should be able to remove a role from a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const removeRoleFromUser = new RemoveRoleFromUser(usersRepository);

    usersRepository.users.push(makeUser({ roles: ['user', 'admin'] }));

    await removeRoleFromUser.execute({ userId: usersRepository.users[0].userId, roleName: 'admin' });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toBeTruthy();
    expect(usersRepository.users[0].roles).toHaveLength(1);
    expect(usersRepository.users[0].roles).toContain('user');
  });
});