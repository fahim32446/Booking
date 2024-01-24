import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import config from '../utils/config';
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
      'https://booking-client.meinfo.xyz/',
      'http://booking-client.meinfo.xyz/',
      'booking-client.meinfo.xyz',
      'https://booking-client.meinfo.xyz',
    ];
  }

  public cloudinary() {
    return cloudinary.config({
      cloud_name: config.CLOUDINARY_CLOUD_NAME,
      api_key: config.CLOUDINARY_API_KEY,
      api_secret: config.CLOUDINARY_API_SECRET,
    });
  }
}

export default Mini;
