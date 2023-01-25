"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserViewModel = void 0;
class UserViewModel {
    static toHTTP(user) {
        return {
            id: user.userId,
            name: user.name,
            email: user.email,
            phone: user.phone,
        };
    }
}
exports.UserViewModel = UserViewModel;
