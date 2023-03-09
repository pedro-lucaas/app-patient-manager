import { User } from "@application/entities/user/user";

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      inactiveDays: user.inactiveDays,
      lunchTime: user.lunchTime,
      workTime: user.workTime,
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
      email: raw.email,
      phone: raw.phone,
      inactiveDays: raw.inactiveDays,
      lunchTime: raw.lunchTime,
      workTime: raw.workTime,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      canceledAt: raw.canceledAt,
      refreshToken: raw.refreshToken,
      roles: raw.roles.map((role: any) => role.role),
    }, raw.id);
  }
}