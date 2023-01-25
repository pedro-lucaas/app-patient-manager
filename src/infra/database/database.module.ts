import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UsersRepository } from "@application/repositories/users-repository";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { RegisterUser } from "@application/use-cases/admin/register-user";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { PrismaPatientsRepository } from "./prisma/repositories/prisma-patients-repository";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { PrismaAttributesRepository } from "./prisma/repositories/prisma-attributes-repository";
import { Appointment } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { PrismaAppointmentsRepository } from "./prisma/repositories/prisma-appointments-repository";
import { LoggerMiddleware } from "./prisma/middlewares/logging.middleware";
import { S3Service } from "@application/services/s3-service";

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    PrismaService,
    RegisterUser,
    S3Service,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: PatientsRepository,
      useClass: PrismaPatientsRepository,
    },
    {
      provide: AttributesRepository,
      useClass: PrismaAttributesRepository,
    },
    {
      provide: AppointmentsRepository,
      useClass: PrismaAppointmentsRepository,
    }
  ],
  exports: [
    UsersRepository,
    PatientsRepository,
    AttributesRepository,
    AppointmentsRepository,
  ],
})

export class DatabaseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}