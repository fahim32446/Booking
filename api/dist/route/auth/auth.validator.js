"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AuthValidator {
    constructor() {
        this.login = [
            (0, express_validator_1.check)('email').notEmpty().withMessage('Enter your email'),
            (0, express_validator_1.check)('password').notEmpty().withMessage('Enter your password'),
        ];
    }
}
exports.default = AuthValidator;
