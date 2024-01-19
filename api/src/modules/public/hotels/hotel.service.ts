import { Request } from 'express';
import AbstractServices from '../../../abstract/abstract.service';
import { IHotelSearchType } from './hotel.type';

class hotelService extends AbstractServices {
  constructor() {
    super();
  }

  public async searchHotel(req: Request) {
    return await this.models.db.transaction(async (trx) => {
      const hotel_conn = this.models.HotelModel(req);

      const pageSize = 10;
      const pageNumber = parseInt(
        req.query.page ? req.query.page.toString() : '1'
      );

      const {
        adult_count,
        child_count,
        city,
        country,
        facilities,
        name,
        price_per_night,
        star_rating,
        type,
      } = req.query as IHotelSearchType;

      const skip = (pageNumber - 1) * pageSize;

      const data = await hotel_conn.searchHotel({
        skip,
        adult_count,
        child_count,
        city,
        country,
        facilities,
        name,
        price_per_night,
        star_rating,
        type,
      });

      return {
        success: true,
        count: data.count,
        data: data.result,
        message: 'Get all hotel',
      };
    });
  }
}

export default hotelService;
