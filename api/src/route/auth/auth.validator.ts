import { check } from 'express-validator';

class AuthValidator {
  login = [
    check('email').notEmpty().withMessage('Enter your email'),
    check('password').notEmpty().withMessage('Enter your password'),
  ];
}

export default AuthValidator;
