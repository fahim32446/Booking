import AbstractModels from '../../abstract/abstract.models';

class HotelModel extends AbstractModels {
  async addHotel(data: any) {
    const [result] = await this.query().insert(data).into('hotels');

    return result;
  }
}

export default HotelModel;
