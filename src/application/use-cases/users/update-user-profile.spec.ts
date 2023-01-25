import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { UpdateUserProfile } from "./update-user-profile";

describe('Update User Profile', () => {
  it('should be able to update a user profile', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUserProfile = new UpdateUserProfile(usersRepository);

    const user = makeUser();

    usersRepository.users.push(user);

    await updateUserProfile.execute({
      name: 'newName',
      userId: user.userId,
      phone: 'newPhone',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0].name).toBe('newName');
    expect(usersRepository.users[0].email).toBe(user.email);
    expect(usersRepository.users[0].phone).toBe('newPhone');
  });

  it('should not be able to update a user profile with an email that no exists', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUserProfile = new UpdateUserProfile(usersRepository);

    await expect(updateUserProfile.execute({
      name: 'name',
      userId: 'userId that no exists',
      phone: 'phone',
    })).rejects.toThrowError('User not found');

    expect(usersRepository.users).toHaveLength(0);
  });
});

