"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_models_1 = __importDefault(require("../../../abstract/abstract.models"));
class HotelModel extends abstract_models_1.default {
    searchHotel({ skip, name, city, star_rating, adult_count, child_count, country, price_per_night, type, facilities, sort_by, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query()
                .select('hotel_id as hotelId', 'name', 'city', 'country', 'description', 'type', 'adult_count as adultCount', 'child_count as childCount', 'price_per_night as pricePerNight', 'star_rating as starRating', 'facilities', 'image_urls as imageUrls', 'last_updated')
                .from('hotels')
                .where((builder) => {
                if (city) {
                    builder.where('city', 'like', `%${city.trim()}%`);
                }
                if (name) {
                    builder.where('name', 'like', `%${name.trim()}%`);
                }
                if (adult_count) {
                    builder.whereRaw('adult_count >= ?', [Number(adult_count)]);
                }
                if (child_count) {
                    builder.where('child_count', 'like', `%${child_count}%`);
                }
                if (country) {
                    builder.where('country', 'like', `%${country.trim()}%`);
                }
                if (price_per_night) {
                    builder.whereRaw('price_per_night <= ?', [Number(price_per_night)]);
                }
                if (star_rating && star_rating.length > 0) {
                    builder.whereIn('star_rating', [star_rating]);
                }
                if (type) {
                    builder.whereIn('type', [type.trim()]);
                }
                if (facilities) {
                    const facilitiesArray = facilities.split(',');
                    builder.where((innerBuilder) => {
                        innerBuilder.where('facilities', 'like', `%${facilitiesArray[0]}%`);
                        for (let i = 1; i < facilitiesArray.length; i++) {
                            innerBuilder.orWhere('facilities', 'like', `%${facilitiesArray[i]}%`);
                        }
                    });
                    // builder.where('facilities', 'like', `%${facilities}%`);
                }
            })
                .orderBy('price_per_night', sort_by)
                .offset(skip)
                .limit(10);
            const count = yield this.query()
                .count('* as total')
                .from('hotels')
                .where((builder) => {
                if (city) {
                    builder.where('city', 'like', `%${city.trim()}%`);
                }
                if (name) {
                    builder.where('name', 'like', `%${name.trim()}%`);
                }
                if (adult_count) {
                    builder.whereRaw('adult_count >= ?', [Number(adult_count)]);
                }
                if (child_count) {
                    builder.where('child_count', 'like', `%${child_count}%`);
                }
                if (country) {
                    builder.where('country', 'like', `%${country.trim()}%`);
                }
                if (price_per_night) {
                    builder.whereRaw('price_per_night <= ?', [Number(price_per_night)]);
                }
                if (star_rating && star_rating.length > 0) {
                    builder.whereIn('star_rating', [star_rating]);
                }
                if (type) {
                    builder.whereIn('type', [type.trim()]);
                }
                if (facilities) {
                    const facilitiesArray = facilities.split(',');
                    builder.where((innerBuilder) => {
                        innerBuilder.where('facilities', 'like', `%${facilitiesArray[0]}%`);
                        for (let i = 1; i < facilitiesArray.length; i++) {
                            innerBuilder.orWhere('facilities', 'like', `%${facilitiesArray[i]}%`);
                        }
                    });
                    // builder.where('facilities', 'like', `%${facilities}%`);
                }
            })
                .first();
            return { result, count: count.total };
        });
    }
    HotelCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.query().count('* as total').from('hotels');
            return result;
        });
    }
    hotelDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.query()
                .select('hotel_id as hotelId', 'name', 'city', 'country', 'description', 'type', 'adult_count as adultCount', 'child_count as childCount', 'price_per_night as pricePerNight', 'star_rating as starRating', 'facilities', 'image_urls as imageUrls', 'last_updated')
                .from('hotels')
                .where('hotel_id', id);
            return result;
        });
    }
}
exports.default = HotelModel;
