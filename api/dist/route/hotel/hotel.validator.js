"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class HotelValidator {
    constructor() {
        this.addHotel = [
            (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
            (0, express_validator_1.body)('city').notEmpty().withMessage('City is required'),
            (0, express_validator_1.body)('country').notEmpty().withMessage('Country is required'),
            (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
            (0, express_validator_1.body)('type').notEmpty().withMessage('Hotel type is required'),
            (0, express_validator_1.body)('pricePerNight')
                .notEmpty()
                .isNumeric()
                .withMessage('Price per night is required and must be a number'),
            (0, express_validator_1.body)('facilities')
                .notEmpty()
                .isArray()
                .withMessage('Facilities are required'),
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
exports.default = HotelValidator;
