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
exports.BookingModal = void 0;
const abstract_models_1 = __importDefault(require("../../../abstract/abstract.models"));
class BookingModal extends abstract_models_1.default {
    bookHotel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const [res] = yield this.query().insert(data).into('bookings');
            return res;
        });
    }
    getBookingList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.query()
                .select('check_in', 'check_out', 'total_cost', 'bookings.hotel_id', 'email', 'first_name', 'name as hotelName', 'city', 'country', 'description', 'type', 'price_per_night', 'star_rating', 'image_urls', 'bookings.adult_count as adultCount', 'bookings.child_count as childCount')
                .from('bookings')
                .where({ 'bookings.user_id': userId })
                .leftJoin('users as user', 'bookings.user_id', 'user.user_id')
                .leftJoin('hotels as hotel', 'bookings.hotel_id', 'hotel.hotel_id');
            return res;
        });
    }
}
exports.BookingModal = BookingModal;
