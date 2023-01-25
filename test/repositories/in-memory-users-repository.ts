import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { Pagination } from "@helpers/Pagination";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(userId: string): Promise<User | null> {
    return this.users.find((user) => user.userId === userId) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async countForRole(roleName: string): Promise<number> {
    return this.users.filter((user) => user.roles.includes(roleName)).length;
  }

  async findAll(page: number = 1): Promise<Pagination<User>> {
    return new Pagination<User>(this.users, this.users.length, page);
  }

  async save(user: User): Promise<void> {
    const index = this.users.findIndex((c) => c.userId === user.userId);
    this.users[index] = user;
  }
}