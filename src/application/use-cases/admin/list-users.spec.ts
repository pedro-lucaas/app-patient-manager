import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { ListUsers } from "./list-users";

describe('List Users', () => {
  it('should be able to list all users', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const listUsers = new ListUsers(usersRepository);

    usersRepository.users.push(makeUser({ name: 'User 1' }));
    usersRepository.users.push(makeUser({ name: 'User 2' }));

    const { users } = await listUsers.execute();

    expect(users.items).toHaveLength(2);
    expect(users.items[0]).toBeTruthy();
    expect(users.items[1]).toBeTruthy();
    expect(users.items[0].name).toBe('User 1');
    expect(users.items[1].name).toBe('User 2');

  });
});