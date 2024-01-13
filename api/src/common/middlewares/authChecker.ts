import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../utils/config';
import CustomError from '../../utils/error/customError';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

class AuthChecker {
  public check = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];

    if (!token) {
      next(new CustomError('Your login is expired', 404, 'No token'));
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.userId = (decoded as JwtPayload).userId;
      next();
    } catch (error) {
      next(new CustomError('Your login is expired', 401, 'Unauthorized'));
    }
  };
}

export default AuthChecker;
