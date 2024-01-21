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
const abstract_service_1 = __importDefault(require("../../../abstract/abstract.service"));
class hotelService extends abstract_service_1.default {
    constructor() {
        super();
    }
    searchHotel(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const hotel_conn = this.models.HotelModel(req);
                const pageSize = 10;
                const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
                const { adult_count, child_count, city, country, facilities, name, price_per_night, star_rating, type, sort_by, } = req.query;
                const skip = (pageNumber - 1) * pageSize;
                const data = yield hotel_conn.searchHotel({
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
                    sort_by,
                });
                return {
                    success: true,
                    count: data.count,
                    data: data.result,
                };
            }));
        });
    }
    hotelDetails(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.models.db.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id.toString();
                const hotel_conn = this.models.HotelModel(req);
                const result = yield hotel_conn.hotelDetails(id);
                return {
                    success: true,
                    data: result,
                };
            }));
        });
    }
}
exports.default = hotelService;
