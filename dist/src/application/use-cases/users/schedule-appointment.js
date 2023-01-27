"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleAppointmentsUseCase = exports.ScheduleAppointmentsUseCaseRequest = void 0;
const appointment_1 = require("../../entities/appointment/appointment");
const appointment_files_1 = require("../../entities/appointment/appointment-files");
const appointments_repository_1 = require("../../repositories/appointments-repository");
const patients_repository_1 = require("../../repositories/patients-repository");
const s3_service_1 = require("../../services/s3-service");
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
class ScheduleAppointmentsUseCaseRequest {
}
exports.ScheduleAppointmentsUseCaseRequest = ScheduleAppointmentsUseCaseRequest;
let ScheduleAppointmentsUseCase = class ScheduleAppointmentsUseCase {
    constructor(patientsRepository, appointmentsRepository, s3Service) {
        this.patientsRepository = patientsRepository;
        this.appointmentsRepository = appointmentsRepository;
        this.s3Service = s3Service;
    }
    async execute(request) {
        const { patientId, initDate, endDate, comments, files, userId, price, procedure, paid } = request;
        if ((0, date_fns_1.isBefore)(initDate, new Date()) || (0, date_fns_1.isBefore)(endDate, new Date())) {
            throw new Error("Date must be in the future");
        }
        const patient = await this.patientsRepository.findById(patientId);
        if (!patient) {
            throw new Error("Patient not found");
        }
        const appointmentWithSameDate = await this.appointmentsRepository.findMany(appointment_1.AppointmentStatus.SCHEDULED, initDate, endDate);
        if (appointmentWithSameDate.length > 0) {
            throw new Error("Appointment in this time already scheduled");
        }
        const appointment = new appointment_1.Appointment({
            userId,
            price,
            procedure,
            paid,
            patientId,
            initDate: initDate,
            endDate: endDate,
            comments,
            files: [],
        });
        if (files) {
            const s3response = await this.s3Service.uploadFiles(files, appointment.appointmentId);
            appointment.files = s3response.map((file) => new appointment_files_1.AppointmentFiles({
                fileName: file.Key,
                fileUrl: file.Location,
                appointmentId: appointment.appointmentId,
            }));
        }
        await this.appointmentsRepository.create(appointment);
    }
};
ScheduleAppointmentsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [patients_repository_1.PatientsRepository,
        appointments_repository_1.AppointmentsRepository,
        s3_service_1.S3Service])
], ScheduleAppointmentsUseCase);
exports.ScheduleAppointmentsUseCase = ScheduleAppointmentsUseCase;
