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
exports.UpdateAppointmentUseCase = exports.UpdateAppointmentRequest = void 0;
const appointment_1 = require("../../entities/appointment/appointment");
const appointment_files_1 = require("../../entities/appointment/appointment-files");
const appointments_repository_1 = require("../../repositories/appointments-repository");
const s3_service_1 = require("../../services/s3-service");
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
class UpdateAppointmentRequest {
}
exports.UpdateAppointmentRequest = UpdateAppointmentRequest;
let UpdateAppointmentUseCase = class UpdateAppointmentUseCase {
    constructor(appointmentsRepository, s3Service) {
        this.appointmentsRepository = appointmentsRepository;
        this.s3Service = s3Service;
    }
    async update(request) {
        const { appointmentId, comments, files, initDate, endDate, price, procedure, paid } = request;
        const appointment = await this.appointmentsRepository.findById(appointmentId);
        if ((0, date_fns_1.isBefore)(initDate, new Date()) || (0, date_fns_1.isBefore)(endDate, new Date())) {
            throw new Error("Date must be in the future");
        }
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        if (!!initDate && !!endDate)
            appointment.setDates(initDate, endDate);
        const appointmentWithSameDate = await this.appointmentsRepository.findMany(undefined, appointment.initDate, appointment.endDate);
        if (appointmentWithSameDate.length > 1 || !appointmentWithSameDate.filter((a) => a.appointmentId === appointment.appointmentId).length) {
            throw new Error("Appointment in this time already scheduled");
        }
        appointment.procedure = procedure !== null && procedure !== void 0 ? procedure : appointment.procedure;
        appointment.price = price !== null && price !== void 0 ? price : appointment.price;
        appointment.paid = paid !== null && paid !== void 0 ? paid : appointment.paid;
        appointment.comments = comments;
        appointment.files = [];
        if (files) {
            const s3response = await this.s3Service.uploadFiles(files, appointment.appointmentId);
            appointment.files = s3response.map((file) => new appointment_files_1.AppointmentFiles({
                fileName: file.Key,
                fileUrl: file.Location,
                appointmentId: appointment.appointmentId,
            }));
        }
        await this.appointmentsRepository.save(appointment);
    }
    async start(request) {
        const { appointmentId } = request;
        const startedAppointment = await this.appointmentsRepository.findStartedAppointment();
        if (startedAppointment) {
            throw new Error("Appointment already started");
        }
        const appointment = await this.appointmentsRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        if (appointment.status !== appointment_1.AppointmentStatus.SCHEDULED) {
            throw new Error("Appointment already started or finished");
        }
        appointment.start();
        await this.appointmentsRepository.save(appointment);
    }
    async finish(request) {
        const { appointmentId } = request;
        const appointment = await this.appointmentsRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        if (appointment.status !== appointment_1.AppointmentStatus.STARTED) {
            throw new Error("Appointment not started");
        }
        appointment.finish();
        await this.appointmentsRepository.save(appointment);
    }
    async cancel(request) {
        const { appointmentId, cancelReason } = request;
        const appointment = await this.appointmentsRepository.findById(appointmentId);
        if (!appointment) {
            throw new Error("Appointment not found");
        }
        if (appointment.status !== appointment_1.AppointmentStatus.SCHEDULED) {
            throw new Error("Appointment already started or finished");
        }
        appointment.cancel(cancelReason);
        await this.appointmentsRepository.save(appointment);
    }
};
UpdateAppointmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [appointments_repository_1.AppointmentsRepository,
        s3_service_1.S3Service])
], UpdateAppointmentUseCase);
exports.UpdateAppointmentUseCase = UpdateAppointmentUseCase;
