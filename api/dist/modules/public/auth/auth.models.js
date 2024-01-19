"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_models_1 = __importDefault(require("../../../abstract/abstract.models"));
class AuthModel extends abstract_models_1.default {
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield this.query()
                .select('user_id', 'email', 'password', 'first_name', 'last_name', this.db.raw("concat(first_name, ' ', last_name) AS name"))
                .from('users')
                .where({ email: email });
            return user;
        });
    }
    checkExistingEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.query()
                .select('user_id', 'email')
                .from('users')
                .where({ email: email });
            return result;
        });
    }
    signUp(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const [id] = yield this.query().insert(userInfo).into('users');
            return { user_id: id };
        });
    }
    updateToken(user_id, otp, otp_expired) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query()
                .update({
                otp: otp,
                otp_expired: otp_expired,
            })
                .into('users')
                .where({ user_id: user_id });
            return result;
        });
    }
    getToken(email, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.query()
                .select('otp', 'otp_expired')
                .from('users')
                .where({ user_id: user_id })
                .andWhere({ email: email });
            return result;
        });
    }
    updatePassword(user_id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query()
                .update({
                password: password,
            })
                .into('users')
                .where({ user_id: user_id });
            return result;
        });
    }
}
exports.default = AuthModel;
