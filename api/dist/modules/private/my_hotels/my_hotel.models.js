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
class MyHotelModel extends abstract_models_1.default {
    addHotel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.query().insert(data).into('hotels');
            return result;
        });
    }
    getHotels(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query()
                .select('*')
                .from('hotels')
                .where({ user_id: id })
                .orderBy('last_updated', 'desc');
            return result;
        });
    }
    getSingleHotel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield this.query()
                .select('hotel_id as hotelId', 'user_id as userId', 'name', 'city', 'country', 'description', 'type', 'facilities', 'adult_count as adultCount', 'child_count as childCount', 'price_per_night as pricePerNight', 'star_rating as starRating', 'image_urls as imageUrls', 'last_updated as lastUpdated')
                .from('hotels')
                .where({ hotel_id: id });
            return result;
        });
    }
    updateHotel(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.query()
                .update(data)
                .into('hotels')
                .where({ hotel_id: id });
            return result;
        });
    }
}
exports.default = MyHotelModel;
