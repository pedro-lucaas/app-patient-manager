"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const find_user_profile_1 = require("../../../application/use-cases/users/find-user-profile");
const reset_password_1 = require("../../../application/use-cases/users/reset-password");
const update_user_profile_1 = require("../../../application/use-cases/users/update-user-profile");
const find_user_profile_controller_1 = require("./controllers/find-user-profile.controller");
const update_user_profile_controller_1 = require("./controllers/update-user-profile.controller");
const reset_password_controller_1 = require("./controllers/reset-password.controller");
const create_patient_1 = require("../../../application/use-cases/users/create-patient");
const create_patient_controller_1 = require("./controllers/create-patient.controller");
const update_patient_controller_1 = require("./controllers/update-patient.controller");
const cancel_patient_controller_1 = require("./controllers/cancel-patient.controller");
const list_patients_controller_1 = require("./controllers/list-patients.controller");
const cancel_pacient_1 = require("../../../application/use-cases/users/cancel-pacient");
const list_patients_1 = require("../../../application/use-cases/users/list-patients");
const update_patient_1 = require("../../../application/use-cases/users/update-patient");
const list_number_of_patients_per_attribute_controller_1 = require("./controllers/list-number-of-patients-per-attribute.controller");
const list_number_of_patients_per_attributes_1 = require("../../../application/use-cases/users/list-number-of-patients-per-attributes");
const create_attribute_controller_1 = require("./controllers/create-attribute.controller");
const delete_attribute_controller_1 = require("./controllers/delete-attribute.controller");
const list_atributes_controller_1 = require("./controllers/list-atributes.controller");
const create_attribute_1 = require("../../../application/use-cases/users/create-attribute");
const delete_attribute_1 = require("../../../application/use-cases/users/delete-attribute");
const list_attributes_1 = require("../../../application/use-cases/users/list-attributes");
const schedule_appointment_controller_1 = require("./controllers/schedule-appointment.controller");
const schedule_appointment_1 = require("../../../application/use-cases/users/schedule-appointment");
const update_appointment_controller_1 = require("./controllers/update-appointment.controller");
const list_patient_appointments_controller_1 = require("./controllers/list-patient-appointments.controller");
const list_patient_appointments_1 = require("../../../application/use-cases/users/list-patient-appointments");
const update_appointment_1 = require("../../../application/use-cases/users/update-appointment");
const s3_service_1 = require("../../../application/services/s3-service");
const list_appointents_controller_1 = require("./controllers/list-appointents.controller");
const list_appointments_1 = require("../../../application/use-cases/users/list-appointments");
const find_patient_1 = require("../../../application/use-cases/users/find-patient");
const find_patient_controller_1 = require("./controllers/find-patient.controller");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
        ],
        controllers: [
            find_user_profile_controller_1.FindUserProfileController,
            reset_password_controller_1.ResetPasswordController,
            update_user_profile_controller_1.UpdateUserProfileController,
            create_patient_controller_1.CreatePatientController,
            update_patient_controller_1.UpdatePatientController,
            cancel_patient_controller_1.CancelPatientController,
            list_patients_controller_1.ListPatientsController,
            find_patient_controller_1.FindPatientController,
            create_attribute_controller_1.CreateAttributeController,
            delete_attribute_controller_1.DeleteAttributeController,
            list_atributes_controller_1.ListAttributesController,
            schedule_appointment_controller_1.ScheduleAppointmentsController,
            update_appointment_controller_1.UpdateAppointmentController,
            list_appointents_controller_1.ListAppointmentsController,
            list_patient_appointments_controller_1.ListPatientAppointmentsController,
            list_number_of_patients_per_attribute_controller_1.ListNumberOfPatientsPerAttributeController,
        ],
        providers: [
            find_user_profile_1.FindUserProfile,
            reset_password_1.ResetPassword,
            update_user_profile_1.UpdateUserProfile,
            create_patient_1.CreatePatientUseCase,
            update_patient_1.UpdatePatientUseCase,
            cancel_pacient_1.CancelPatientUseCase,
            list_patients_1.ListPatientsUseCase,
            find_patient_1.FindPatientUseCase,
            create_attribute_1.CreateAttributeUseCase,
            delete_attribute_1.DeleteAttributeUseCase,
            list_attributes_1.ListAttributesUseCase,
            schedule_appointment_1.ScheduleAppointmentsUseCase,
            update_appointment_1.UpdateAppointmentUseCase,
            list_appointments_1.ListAppointmentsUseCase,
            list_patient_appointments_1.ListPatientAppointmentsUseCase,
            list_number_of_patients_per_attributes_1.ListNumberOfPatientsPerAttributeUseCase,
            s3_service_1.S3Service,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
