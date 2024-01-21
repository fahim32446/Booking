"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
class userValidator {
    constructor() {
        this.bookingConfirm = [
            (0, express_validator_1.body)('adult_count').isInt().toInt(),
            (0, express_validator_1.body)('check_in').isISO8601().toDate(),
            (0, express_validator_1.body)('check_out').isISO8601().toDate(),
            (0, express_validator_1.body)('child_count').isInt().toInt(),
            (0, express_validator_1.body)('hotel_id').isInt().toInt(),
            (0, express_validator_1.body)('paymentIntentId').isString(),
            (0, express_validator_1.body)('total_cost').isNumeric().toFloat(),
        ];
    }
}
exports.userValidator = userValidator;
