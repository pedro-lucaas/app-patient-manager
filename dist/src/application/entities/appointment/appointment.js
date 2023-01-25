"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.AppointmentStatus = void 0;
const date_fns_1 = require("date-fns");
const node_crypto_1 = require("node:crypto");
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["SCHEDULED"] = "scheduled";
    AppointmentStatus["STARTED"] = "started";
    AppointmentStatus["FINISHED"] = "finished";
    AppointmentStatus["CANCELED"] = "canceled";
})(AppointmentStatus = exports.AppointmentStatus || (exports.AppointmentStatus = {}));
class Appointment {
    set(props) {
        this.props = Object.assign(Object.assign(Object.assign({}, this.props), props), { updatedAt: new Date() });
        this.validDates();
    }
    validDates() {
        if ((0, date_fns_1.isDate)(this.props.initDate) && (0, date_fns_1.isDate)(this.props.endDate)) {
            if (!(0, date_fns_1.isBefore)(this.props.initDate, this.props.endDate)) {
                throw new Error('Init date must be before end date');
            }
        }
    }
    constructor(props, appointmentId) {
        var _a, _b, _c;
        this._appointmentId = appointmentId !== null && appointmentId !== void 0 ? appointmentId : (0, node_crypto_1.randomUUID)();
        this.props = Object.assign(Object.assign({}, props), { createdAt: (_a = props.createdAt) !== null && _a !== void 0 ? _a : new Date(), updatedAt: (_b = props.updatedAt) !== null && _b !== void 0 ? _b : new Date(), status: (_c = props.status) !== null && _c !== void 0 ? _c : AppointmentStatus.SCHEDULED });
        this.validDates();
    }
    get appointmentId() {
        return this._appointmentId;
    }
    get userId() {
        return this.props.userId;
    }
    get patientId() {
        return this.props.patientId;
    }
    get patient() {
        return this.props.patient;
    }
    get initDate() {
        return this.props.initDate;
    }
    get endDate() {
        return this.props.endDate;
    }
    get status() {
        return this.props.status;
    }
    get procedure() {
        return this.props.procedure;
    }
    get price() {
        return this.props.price;
    }
    get paid() {
        return this.props.paid;
    }
    get comments() {
        return this.props.comments;
    }
    get cancelReason() {
        return this.props.cancelReason;
    }
    get files() {
        return this.props.files;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    set initDate(initDate) {
        this.set({ initDate });
    }
    set endDate(endDate) {
        this.set({ endDate });
    }
    set status(status) {
        this.set({ status });
    }
    set comments(comments) {
        this.set({ comments });
    }
    set cancelReason(cancelReason) {
        this.set({ cancelReason });
    }
    set files(files) {
        this.set({ files });
    }
    cancel(cancelReason) {
        this.set({
            status: AppointmentStatus.CANCELED,
            cancelReason,
        });
    }
    start() {
        this.set({
            status: AppointmentStatus.STARTED,
            initDate: new Date(),
            cancelReason: undefined,
            endDate: undefined,
        });
        this.validDates();
    }
    finish() {
        this.set({
            status: AppointmentStatus.FINISHED,
            endDate: new Date(),
            cancelReason: undefined,
        });
        this.validDates();
    }
}
exports.Appointment = Appointment;
