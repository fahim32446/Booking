import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/error/customError';

class Mini {
  public 404(_req: Request, _res: Response, next: NextFunction) {
    next(new CustomError('Cannot find the route', 404, 'Invalid route'));
  }

  public cors() {
    return [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://localhost:5173',
      'localhost:5173',
    ];
  }
}

export default Mini;
