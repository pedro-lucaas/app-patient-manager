"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentFiles = void 0;
class AppointmentFiles {
    constructor(props) {
        this.props = props;
    }
    get id() {
        return this.props.id;
    }
    get appointmentId() {
        return this.props.appointmentId;
    }
    get fileName() {
        return this.props.fileName;
    }
    get fileUrl() {
        return this.props.fileUrl;
    }
}
exports.AppointmentFiles = AppointmentFiles;
