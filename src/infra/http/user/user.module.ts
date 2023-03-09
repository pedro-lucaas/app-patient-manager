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
import { CreateAttributeController } from "./controllers/create-attribute.controller";
import { DeleteAttributeController } from "./controllers/delete-attribute.controller";
import { CreateAttributeUseCase } from "@application/use-cases/users/create-attribute";
import { DeleteAttributeUseCase } from "@application/use-cases/users/delete-attribute";
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
import { DeleteAppointmentController } from "./controllers/delete-appointment.controller";
import { DeleteAppointmentUseCase } from "@application/use-cases/users/delete-appointment";
import { FindAppointmentController } from "./controllers/find-appointment.controller";
import { FindAppointmentUseCase } from "@application/use-cases/users/find-appointment";
import { UploadImagesController } from "./controllers/upload-images.controller";
import { UploadImagesUseCase } from "@application/use-cases/users/upload-images";
import { DeleteImageUseCase } from "@application/use-cases/users/delete-image";
import { DeleteImageController } from "./controllers/delete-image.controller";

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
    ScheduleAppointmentsController,
    UpdateAppointmentController,
    FindAppointmentController,
    ListAppointmentsController,
    ListPatientAppointmentsController,
    DeleteAppointmentController,
    UploadImagesController,
    DeleteImageController,
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
    ScheduleAppointmentsUseCase,
    UpdateAppointmentUseCase,
    FindAppointmentUseCase,
    ListAppointmentsUseCase,
    ListPatientAppointmentsUseCase,
    DeleteAppointmentUseCase,
    UploadImagesUseCase,
    DeleteImageUseCase,
    S3Service,
  ],
})

export class UserModule { }