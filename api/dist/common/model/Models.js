"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database");
const my_hotel_models_1 = __importDefault(require("../../modules/private/my_hotels/my_hotel.models"));
const auth_models_1 = __importDefault(require("../../modules/public/auth/auth.models"));
const hotel_models_1 = __importDefault(require("../../modules/public/hotels/hotel.models"));
const user_model_1 = require("../../modules/private/user/user.model");
const booking_modal_1 = require("../../modules/private/booking/booking.modal");
class Models {
    constructor() {
        this.db = database_1.db;
    }
    authModel(req, trx) {
        return new auth_models_1.default(trx || this.db, req);
    }
    myHotelModel(req, trx) {
        return new my_hotel_models_1.default(trx || this.db, req);
    }
    HotelModel(req, trx) {
        return new hotel_models_1.default(trx || this.db, req);
    }
    userModal(req, trx) {
        return new user_model_1.userModel(trx || this.db, req);
    }
    BookingModal(req, trx) {
        return new booking_modal_1.BookingModal(trx || this.db, req);
    }
}
exports.default = Models;
