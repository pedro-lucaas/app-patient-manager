import { makeUser } from "@test/factory/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { FindUserProfile } from "./find-user-profile";

describe('Find User Profile', () => {
  it('should be able to find a user profile', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const findUserProfile = new FindUserProfile(usersRepository);

    usersRepository.users.push(makeUser({ name: 'User 1' }));

    const { user } = await findUserProfile.execute({ userId: usersRepository.users[0].userId });

    expect(user).toBeTruthy();
  });
});