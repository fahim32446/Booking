import { Request } from 'express';
import { Knex } from 'knex';
import { db } from '../../database';
import MyHotelModel from '../../modules/private/my_hotels/my_hotel.models';
import AuthModel from '../../modules/public/auth/auth.models';
import HotelModel from '../../modules/public/hotels/hotel.models';
import { userModel } from '../../modules/private/user/user.model';
import { BookingModal } from '../../modules/private/booking/booking.modal';

class Models {
  public db = db;

  public authModel(req: Request, trx?: Knex.Transaction) {
    return new AuthModel(trx || this.db, req);
  }

  public myHotelModel(req: Request, trx?: Knex.Transaction) {
    return new MyHotelModel(trx || this.db, req);
  }

  public HotelModel(req: Request, trx?: Knex.Transaction) {
    return new HotelModel(trx || this.db, req);
  }

  public userModal(req: Request, trx?: Knex.Transaction) {
    return new userModel(trx || this.db, req);
  }

  public BookingModal(req: Request, trx?: Knex.Transaction) {
    return new BookingModal(trx || this.db, req);
  }
}

export default Models;
