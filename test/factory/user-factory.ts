import { faker } from "@faker-js/faker";
import { User } from "@application/entities/user/user";

export function makeUser(overrides?: Partial<User>): User {
  return new User({
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number('## # ####-####'),

    ...overrides,
  });
}