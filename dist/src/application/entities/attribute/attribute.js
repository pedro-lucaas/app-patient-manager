"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
class Attribute {
    constructor(props) {
        this.props = props;
    }
    get name() {
        return this.props.name;
    }
    get patients() {
        return this.props.patients;
    }
}
exports.Attribute = Attribute;
