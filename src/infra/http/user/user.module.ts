import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { FindUserProfile } from "@application/use-cases/users/find-user-profile";
import { ResetPassword } from "@application/use-cases/users/reset-password";
import { UpdateUserProfile } from "@application/use-cases/users/update-user-profile";
import { FindUserProfileController } from "./controllers/find-user-profile.controller";
import { UpdateUserProfileController } from "./controllers/update-user-profile.controller";
import { ResetPasswordController } from "./controllers/reset-password.controller";
import { CreatePatientUseCase } from "@application/use-cases/users/create-patient";
import { CreatePatientController } from "./controllers/create-patient.controller";
import { UpdatePatientController } from "./controllers/update-patient.controller";
import { CancelPatientController } from "./controllers/cancel-patient.controller";
import { ListPatientsController } from "./controllers/list-patients.controller";
import { CancelPatientUseCase } from "@application/use-cases/users/cancel-pacient";
import { ListPatientsUseCase } from "@application/use-cases/users/list-patients";
import { UpdatePatientUseCase } from "@application/use-cases/users/update-patient";
import { ListNumberOfPatientsPerAttributeController } from "./controllers/list-number-of-patients-per-attribute.controller";
import { ListNumberOfPatientsPerAttributeUseCase } from "@application/use-cases/users/list-number-of-patients-per-attributes";
import { CreateAttributeController } from "./controllers/create-attribute.controller";
import { DeleteAttributeController } from "./controllers/delete-attribute.controller";
import { ListAttributesController } from "./controllers/list-atributes.controller";
import { CreateAttributeUseCase } from "@application/use-cases/users/create-attribute";
import { DeleteAttributeUseCase } from "@application/use-cases/users/delete-attribute";
import { ListAttributesUseCase } from "@application/use-cases/users/list-attributes";
import { ScheduleAppointmentsController } from "./controllers/schedule-appointment.controller";
import { ScheduleAppointmentsUseCase } from "@application/use-cases/users/schedule-appointment";
import { UpdateAppointmentController } from "./controllers/update-appointment.controller";
import { ListPatientAppointmentsController } from "./controllers/list-patient-appointments.controller";
import { ListPatientAppointmentsUseCase } from "@application/use-cases/users/list-patient-appointments";
import { UpdateAppointmentUseCase } from "@application/use-cases/users/update-appointment";
import { S3Service } from "@application/services/s3-service";
import { ListAppointmentsController } from "./controllers/list-appointents.controller";
import { ListAppointmentsUseCase } from "@application/use-cases/users/list-appointments";
import { FindPatientUseCase } from "@application/use-cases/users/find-patient";
import { FindPatientController } from "./controllers/find-patient.controller";

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    FindUserProfileController,
    ResetPasswordController,
    UpdateUserProfileController,
    CreatePatientController,
    UpdatePatientController,
    CancelPatientController,
    ListPatientsController,
    FindPatientController,
    CreateAttributeController,
    DeleteAttributeController,
    ListAttributesController,
    ScheduleAppointmentsController,
    UpdateAppointmentController,
    ListAppointmentsController,
    ListPatientAppointmentsController,
    ListNumberOfPatientsPerAttributeController,
  ],
  providers: [
    FindUserProfile,
    ResetPassword,
    UpdateUserProfile,
    CreatePatientUseCase,
    UpdatePatientUseCase,
    CancelPatientUseCase,
    ListPatientsUseCase,
    FindPatientUseCase,
    CreateAttributeUseCase,
    DeleteAttributeUseCase,
    ListAttributesUseCase,
    ScheduleAppointmentsUseCase,
    UpdateAppointmentUseCase,
    ListAppointmentsUseCase,
    ListPatientAppointmentsUseCase,
    ListNumberOfPatientsPerAttributeUseCase,
    S3Service,
  ],
})

export class UserModule { }