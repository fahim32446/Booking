import { body } from "express-validator";

export class userValidator {
  bookingConfirm = [
    body('adult_count').isInt().toInt(),
    body('check_in').isISO8601().toDate(),
    body('check_out').isISO8601().toDate(),
    body('child_count').isInt().toInt(),
    body('hotel_id').isInt().toInt(),
    body('paymentIntentId').isString(),
    body('total_cost').isNumeric().toFloat(),
  ];
}
