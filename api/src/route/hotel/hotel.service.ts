import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import AbstractServices from '../../abstract/abstract.service';
import CustomError from '../../utils/error/customError';
import { HotelData, IHotelType } from './hotel.type';
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
      const hotel_conn = this.models.hotelModel(req);

      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: IHotelType = req.body;

      const imageUrls = await uploadImages(imageFiles);

      const data: HotelData = {
        user_id: req.userId,
        name: newHotel.name,
        city: newHotel.city,
        country: newHotel.country,
        description: newHotel.description,
        type: newHotel.type,
        adult_count: newHotel.adultCount,
        child_count: newHotel.childCount,
        price_per_night: newHotel.pricePerNight,
        star_rating: newHotel.starRating,
        image_urls: JSON.stringify(imageUrls),
      };

      const result = await hotel_conn.addHotel(data);

      return {
        success: true,
        data: result,
        message: 'User login successfully done',
      };
    });
  }
}

export default HotelService;
