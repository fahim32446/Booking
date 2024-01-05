import { check } from 'express-validator';

class AuthValidator {
  login = [
    check('email').notEmpty().withMessage('Enter your email'),
    check('password').notEmpty().withMessage('Enter your password').isLength({
      min: 6,
    }),
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

export default AuthValidator;
