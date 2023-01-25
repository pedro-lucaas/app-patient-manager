import { User } from "@application/entities/user/user";

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.userId,
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      canceledAt: user.canceledAt,
      refreshToken: user.refreshToken,
      roles: {
        connectOrCreate: user.roles.map(role => ({
          create: { role },
          where: {
            userId_role: { userId: user.userId, role }
          },
        })),
        deleteMany: {
          role: {
            notIn: user.roles,
          },
        },
      },
    };
  }

  static toDomain(raw: any): User {
    if (!raw) return null;
    return new User({
      name: raw.name,
      phone: raw.phone,
      email: raw.email,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      canceledAt: raw.canceledAt,
      refreshToken: raw.refreshToken,
      roles: raw.roles.map((role: any) => role.role),
    }, raw.id);
  }
}