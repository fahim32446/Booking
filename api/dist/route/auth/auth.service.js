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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const abstract_service_1 = __importDefault(require("../../abstract/abstract.service"));
const customError_1 = __importDefault(require("../../utils/error/customError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../utils/config"));
class AuthService extends abstract_service_1.default {
    constructor() {
        super();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const auth_conn = this.models.authModel(req);
                const user = yield auth_conn.login(email);
                const userIsExist = yield auth_conn.checkExistingEmail(email);
                if (!userIsExist) {
                    throw new customError_1.default('No user exist with this email', 400, 'Error');
                }
                const passwordMatch = yield bcryptjs_1.default.compare(req.body.password, user.password);
                if (!passwordMatch) {
                    throw new customError_1.default('Wrong password', 400, 'Error');
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.user_id }, config_1.default.JWT_SECRET, {
                    expiresIn: '1d',
                });
                res.cookie(config_1.default.COOKIES_NAME, token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 86400000,
                });
                const { password } = user, others = __rest(user, ["password"]);
                return {
                    success: true,
                    data: Object.assign(Object.assign({}, others), { token }),
                    message: 'User login successfully done',
                };
            }));
        });
    }
    signGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, first_name, last_name } = req.body;
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const auth_conn = this.models.authModel(req);
                const userIsExist = yield auth_conn.checkExistingEmail(email);
                let user;
                if (userIsExist) {
                    user = yield auth_conn.login(email);
                }
                else {
                    const generatedPassword = Math.random().toString(36).slice(-8) +
                        Math.random().toString(36).slice(-8);
                    const hashedPassword = yield bcryptjs_1.default.hash(generatedPassword, 10);
                    const newUserInfo = {
                        email: email,
                        password: hashedPassword,
                        first_name: first_name,
                        last_name: last_name,
                    };
                    user = yield auth_conn.signUp(newUserInfo);
                }
                const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user.user_id }, config_1.default.JWT_SECRET, {
                    expiresIn: '1d',
                });
                res.cookie(config_1.default.COOKIES_NAME, token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 86400000,
                });
                user = {
                    user_id: user.user_id,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    name: first_name + ' ' + last_name,
                    token,
                };
                return {
                    success: true,
                    data: user,
                    message: 'User login successfully done',
                };
            }));
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, first_name, last_name } = req.body;
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const auth_conn = this.models.authModel(req);
                const checkAlreadyExist = yield auth_conn.checkExistingEmail(email);
                if (checkAlreadyExist.user_id) {
                    throw new customError_1.default('Email already exists', 409, 'Conflict');
                }
                const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
                const newUserInfo = {
                    email: email,
                    password: hashedPassword,
                    first_name: first_name,
                    last_name: last_name,
                };
                const user = yield auth_conn.signUp(newUserInfo);
                const token = jsonwebtoken_1.default.sign({ userId: user.user_id }, config_1.default.JWT_SECRET, {
                    expiresIn: '1d',
                });
                res.cookie(config_1.default.COOKIES_NAME, token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 86400000,
                });
                const { password } = newUserInfo, others = __rest(newUserInfo, ["password"]);
                return {
                    success: true,
                    data: Object.assign(Object.assign({ user_id: user.user_id }, others), { name: first_name + ' ' + last_name, token }),
                    message: 'User registration successfully done',
                };
            }));
        });
    }
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie(config_1.default.COOKIES_NAME);
            return {
                success: true,
                message: 'User sign out successfully done',
            };
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const auth_conn = this.models.authModel(req);
                const checkAlreadyExist = yield auth_conn.checkExistingEmail(email);
                if (!checkAlreadyExist.user_id) {
                    throw new customError_1.default('No account found with this email', 400, 'Error');
                }
                const resetOTP = Math.floor(100000 + Math.random() * 900000);
                const OTPExpired = Date.now() + 3600000; // Token expiry in 1 hour
                const user_id = checkAlreadyExist.user_id;
                auth_conn.updateToken(user_id, resetOTP, OTPExpired);
                const transporter = nodemailer_1.default.createTransport({
                    //@ts-ignore
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: '587',
                    auth: {
                        user: config_1.default.SENDER_EMAIL,
                        pass: config_1.default.SENDER_EMAIL_APP_PASS,
                    },
                });
                const mailOptions = {
                    from: config_1.default.SENDER_EMAIL,
                    to: email,
                    subject: 'Password Reset',
                    text: `Please provide this code for reset your password : ${resetOTP}`,
                };
                yield transporter.sendMail(mailOptions);
                return {
                    success: true,
                    message: 'OTP send in your email, please check it',
                };
            }));
        });
    }
    verifyOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = req.body;
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const auth_conn = this.models.authModel(req);
                const checkAlreadyExist = yield auth_conn.checkExistingEmail(email);
                if (!checkAlreadyExist.user_id) {
                    throw new customError_1.default('No account found with this email', 400, 'Error');
                }
                const user_id = checkAlreadyExist.user_id;
                const res = yield auth_conn.getToken(email, user_id);
                if (!(Number(res.otp) === Number(otp) && res.otp_expired > Date.now())) {
                    throw new customError_1.default('This OTP has Expired', 400, 'Error');
                }
                const token = jsonwebtoken_1.default.sign({ userId: user_id }, config_1.default.JWT_SECRET, {
                    expiresIn: '1h',
                });
                return {
                    success: true,
                    message: 'your OTP is verified',
                    data: token,
                };
            }));
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, token, password } = req.body;
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const auth_conn = this.models.authModel(req);
                if (!req.body.token) {
                    throw new customError_1.default('Unauthorized action or otp expired', 401, 'Error');
                }
                const decoded = jsonwebtoken_1.default.verify(req.body.token, config_1.default.JWT_SECRET);
                const user_id = decoded.userId;
                if (!decoded || !user_id) {
                    throw new customError_1.default('Unauthorized action or otp expired', 401, 'Error');
                }
                const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, 10);
                yield auth_conn.updatePassword(user_id, hashedPassword);
                return {
                    success: true,
                    message: 'Your password change successfully done',
                };
            }));
        });
    }
}
exports.default = AuthService;
