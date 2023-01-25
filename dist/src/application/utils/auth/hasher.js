"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hasher = void 0;
const bcrypt = require("bcrypt");
class Hasher {
    static hash(password) {
        return bcrypt.hashSync(password, 8);
    }
    static compare(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}
exports.Hasher = Hasher;
