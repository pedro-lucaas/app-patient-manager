"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientAttributes = void 0;
class PatientAttributes {
    constructor(props) {
        this.props = props;
    }
    get name() {
        return this.props.name;
    }
    get value() {
        return this.props.value;
    }
    set value(value) {
        this.props.value = value;
    }
}
exports.PatientAttributes = PatientAttributes;
