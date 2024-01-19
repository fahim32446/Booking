"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AuthValidator {
    constructor() {
        this.login = [
            (0, express_validator_1.check)('email').notEmpty().withMessage('Enter your email'),
            (0, express_validator_1.check)('password').notEmpty().withMessage('Enter your password').isLength({
                min: 6,
            }),
        ];
        this.loginGoogle = [
            (0, express_validator_1.check)('first_name', 'First Name is required').isString(),
            (0, express_validator_1.check)('last_name', 'Last Name is required').isString().optional(),
            (0, express_validator_1.check)('email', 'Email is required').isEmail(),
        ];
        this.signUp = [
            (0, express_validator_1.check)('first_name', 'First Name is required').isString(),
            (0, express_validator_1.check)('last_name', 'Last Name is required').isString(),
            (0, express_validator_1.check)('email', 'Email is required').isEmail(),
            (0, express_validator_1.check)('password', 'Password with 6 or more characters required').isLength({
                min: 6,
            }),
        ];
        this.forgotPassword = [(0, express_validator_1.check)('email').notEmpty().withMessage('Enter your email')];
        this.otp = [
            (0, express_validator_1.check)('email').notEmpty().withMessage('Enter your email'),
            (0, express_validator_1.check)('otp').notEmpty().withMessage('Enter OTP'),
        ];
        this.resetPassword = [
            (0, express_validator_1.check)('email').notEmpty().withMessage('Enter your email'),
            (0, express_validator_1.check)('token').notEmpty().withMessage('token missing'),
            (0, express_validator_1.check)('password').notEmpty().withMessage('Enter password'),
        ];
    }
}
exports.default = AuthValidator;
