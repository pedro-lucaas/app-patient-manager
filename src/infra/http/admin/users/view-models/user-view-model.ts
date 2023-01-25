import { User } from "@application/entities/user/user";

export class UserViewModel {
  static toHTTP(user: User): UserViewModel {
    return {
      id: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      roles: user.roles,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      canceledAt: user.canceledAt,
    };
  }
}