import AbstractModels from '../../abstract/abstract.models';
import { HotelData } from './hotel.type';

class HotelModel extends AbstractModels {
  async addHotel(data: HotelData) {
    const [result] = await this.query().insert(data).into('hotels');

    return result;
  }
}

export default HotelModel;
