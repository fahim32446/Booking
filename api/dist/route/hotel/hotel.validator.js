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
    }
}
exports.default = HotelValidator;
