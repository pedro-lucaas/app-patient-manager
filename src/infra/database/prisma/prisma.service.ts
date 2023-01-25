import { RegisterUser } from "@application/use-cases/admin/register-user";
import { INestApplication, Inject, Injectable, OnModuleInit, forwardRef } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { RootUser } from "./create-root-user";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => RegisterUser))
    private registerUser: RegisterUser,
  ) {
    super();
  }
  async onModuleInit() {
    await this.$connect();
    RootUser.create(this.registerUser)
  }

  async enableShutDownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
