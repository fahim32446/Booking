"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class HotelValidator {
    constructor() {
        this.hotelDetails = [(0, express_validator_1.param)('id').notEmpty().withMessage('Hotel id is required')];
    }
}
exports.default = HotelValidator;
