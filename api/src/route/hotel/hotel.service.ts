import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import CustomError from '../../utils/error/customError';
import { IHotelType } from './hotel.type';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { IDecoded } from '../../common/type';
import config from '../../utils/config';
import { uploadImages } from '../../utils/imageUpload';

class HotelService extends AbstractServices {
  constructor() {
    super();
  }

  public async addHotel(req: Request, res: Response) {
    return await this.models.db.transaction(async (trx) => {
      const auth_conn = this.models.hotelModel(req);

      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: IHotelType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      const data = {
        user_id: req.userId,
      };

      const result = await auth_conn.addHotel(data);

      return {
        success: true,
        data: result,
        message: 'User login successfully done',
      };
    });
  }
}

export default HotelService;
