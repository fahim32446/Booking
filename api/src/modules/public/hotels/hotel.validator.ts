import { param } from 'express-validator';

class HotelValidator {
  hotelDetails = [param('id').notEmpty().withMessage('Hotel id is required')];
}

export default HotelValidator;
