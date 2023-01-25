import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { AddRoleToUser } from "./add-role-to-user";

describe('Add Role to User', () => {
  it('should be able to add a role to a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const addRoleToUser = new AddRoleToUser(usersRepository);

    usersRepository.users.push(makeUser({ roles: ['user'] }));

    await addRoleToUser.execute({ userId: usersRepository.users[0].userId, roleName: 'admin' });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toBeTruthy();
    expect(usersRepository.users[0].roles).toHaveLength(2);
    expect(usersRepository.users[0].roles).toContain('user');
    expect(usersRepository.users[0].roles).toContain('admin');
  });
});