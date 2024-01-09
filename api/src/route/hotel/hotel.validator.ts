import { body, check } from 'express-validator';

class HotelValidator {
  addHotel = [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price per night is required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required'),
  ];

  loginGoogle = [
    check('first_name', 'First Name is required').isString(),
    check('last_name', 'Last Name is required').isString().optional(),
    check('email', 'Email is required').isEmail(),
  ];

  signUp = [
    check('first_name', 'First Name is required').isString(),
    check('last_name', 'Last Name is required').isString(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with 6 or more characters required').isLength({
      min: 6,
    }),
  ];

  forgotPassword = [check('email').notEmpty().withMessage('Enter your email')];

  otp = [
    check('email').notEmpty().withMessage('Enter your email'),
    check('otp').notEmpty().withMessage('Enter OTP'),
  ];

  resetPassword = [
    check('email').notEmpty().withMessage('Enter your email'),
    check('token').notEmpty().withMessage('token missing'),
    check('password').notEmpty().withMessage('Enter password'),
  ];
}

export default HotelValidator;
