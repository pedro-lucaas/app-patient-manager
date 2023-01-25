import { User } from "@application/entities/user/user";
import { UsersRepository } from "@application/repositories/users-repository";
import { PAGE_SIZE } from "@config/config";
import { Pagination } from "@helpers/Pagination";
import { Role } from "@infra/http/auth/roles/role.enum";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) { }
  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prisma.users.create({
      data: {
        ...raw,
        roles: { create: raw.roles.connectOrCreate.map(role => role.create) },
        UserConfig: {
          create: {}
        },
      },
    });

  }
  async findById(id: string): Promise<User> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
      include: { roles: true }
    }).then(PrismaUserMapper.toDomain);
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.users.findUnique({
      where: {
        email,
      },
      include: { roles: true }
    }).then(PrismaUserMapper.toDomain);
  }

  async findAll(page: number = 1): Promise<Pagination<User>> {
    const total = await this.prisma.users.count();
    return this.prisma.users.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { roles: true }
    }).then(users => users.map(PrismaUserMapper.toDomain))
      .then(users => new Pagination<User>(users, total, page));
  }

  async save(user: User): Promise<void> {
    await this.prisma.users.update({
      where: {
        id: user.userId,
      },
      data: PrismaUserMapper.toPrisma(user),
    });
  }

  async countForRole(role: Role): Promise<number> {
    return this.prisma.users.count({
      where: {
        roles: {
          some: {
            role,
          },
        },
      },
    });
  }

}
