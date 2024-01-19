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
    searchHotel({ skip, name, city, star_rating, adult_count, child_count, country, price_per_night, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query()
                .select('hotel_id as hotelId', 'name', 'city', 'country', 'description', 'type', 'adult_count as adultCount', 'child_count as childCount', 'price_per_night as pricePerNight', 'star_rating as starRating', 'facilities', 'image_urls as imageUrls', 'last_updated')
                .from('hotels')
                .where((builder) => {
                if (city) {
                    builder.where('city', 'like', `%${city}%`);
                }
                if (name) {
                    builder.where('name', 'like', `%${name}%`);
                }
                if (star_rating) {
                    builder.where('star_rating', 'like', `%${star_rating}%`);
                }
                if (adult_count) {
                    builder.where('adult_count', 'like', `%${adult_count}%`);
                }
                if (child_count) {
                    builder.where('child_count', 'like', `%${child_count}%`);
                }
                if (country) {
                    builder.where('country', 'like', `%${country}%`);
                }
                if (price_per_night) {
                    builder.where('price_per_night', 'like', `%${price_per_night}%`);
                }
            })
                .offset(skip)
                .limit(10);
            const count = yield this.query()
                .count('* as total')
                .from('hotels')
                .where((builder) => {
                if (city) {
                    builder.where('city', 'like', `%${city}%`);
                }
                if (name) {
                    builder.where('name', 'like', `%${name}%`);
                }
                if (star_rating) {
                    builder.where('star_rating', 'like', `%${star_rating}%`);
                }
                if (adult_count) {
                    builder.where('adult_count', 'like', `%${adult_count}%`);
                }
                if (child_count) {
                    builder.where('child_count', 'like', `%${child_count}%`);
                }
                if (country) {
                    builder.where('country', 'like', `%${country}%`);
                }
                if (price_per_night) {
                    builder.where('price_per_night', 'like', `%${price_per_night}%`);
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
}
exports.default = HotelModel;
